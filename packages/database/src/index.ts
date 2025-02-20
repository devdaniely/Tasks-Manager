import pgPromise from "pg-promise";
import { Task } from "@app/models";

export default class DatabaseConnector {
    private pgp: any;
    private db: any;

    constructor() {
        this.pgp = pgPromise();
        this.db = this.pgp({
            host: 'localhost',
            port: 5432,
            database: 'pirrosdb',
            user: 'appuser',
            password: 'pirrospw',
            max: 10, // Limit connections 
            idleTimeoutMillis: 30000 // Close idle connections after 30s
        });
        console.log("Constructed DatabaseConnector")
    }

    async getAllUsers(): Promise<any> {
        console.log("test db connect")
        return this.db.any('SELECT * FROM Users')
    }

    async getUserByUsername(username: string): Promise<any> {
        return this.db.one(
            'SELECT * FROM Users AS u INNER JOIN Auth AS a ON u.id = a.id WHERE u.username = $1', 
            [username]
        )
    }

    // TODO: Add pagination to get tasks by page size. The current impl will dump all tasks which can take a while if there is a lot
    async getAllTasks(): Promise<any> {
        const query = `SELECT  t.task_id, t.created_by, t.assigned_to, t.title, t.description, t.due_date, t.created_at, t.modified_at,
                jsonb_agg(
                    jsonb_build_object(
                        'task_id', tc.task_id,
                        'task_field', tc.task_field,
                        'content', tc.content,
                        'attachment', tc.attachment
                    )
                ) AS task_contents
            FROM Tasks AS t
            INNER JOIN TaskContent AS tc ON t.task_id = tc.task_id
            GROUP BY t.task_id`

        return this.db.any(query)
    }

    async deleteTask(task_id: string): Promise<any> {
        const query = `
            BEGIN;
                DELETE FROM TaskContent WHERE task_id = $1;
                DELETE FROM Tasks WHERE task_id = $1;
            COMMIT;`
        return this.db.none(query, [task_id])
    }

    async createOrUpdateTask(task: Task) {
        const query = `
        WITH upsert_task AS (
            INSERT INTO Tasks (task_id, created_by, assigned_to, title, description, modified_at, created_at, due_date)
            VALUES (
                \${task_id}, 
                \${created_by}, 
                NULLIF(\${assigned_to}, null::uuid),
                \${title}, 
                \${description}, 
                NOW(), 
                NOW(),
                NULLIF(\${due_date}, null::timestamp)
            )
            ON CONFLICT (task_id) DO UPDATE 
            SET 
                created_by = \${created_by},
                assigned_to = EXCLUDED.assigned_to,
                title = EXCLUDED.title,
                description = EXCLUDED.description,
                due_date = EXCLUDED.due_date,
                modified_at = NOW()
            RETURNING task_id
        )
        INSERT INTO TaskContent (task_id, task_field, content, attachment)
            SELECT 
                upsert_task.task_id,
                t2.task_field,      
                t2.content,         
                t2.attachment       
            FROM upsert_task, 
            LATERAL UNNEST(\${task_contents}::jsonb[]) AS t(json_data), 
            LATERAL jsonb_to_record(t.json_data) AS t2(taskContent_id text, task_field text, content text, attachment boolean)
        ON CONFLICT (task_id, task_field) DO UPDATE 
        SET 
            content = EXCLUDED.content,
            attachment = EXCLUDED.attachment
    `;
    
        const params = JSON.parse(JSON.stringify(task))
        
        console.log("DB Creating/Updating TASK: ", params)
        return this.db.none(query, params)
    }

}





