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
        return this.db.any('SELECT * FROM Users;')
    }

    async getUserByUsername(username: string): Promise<any> {
        return this.db.one(
            'SELECT * FROM Users AS u INNER JOIN Auth AS a ON u.id = a.id WHERE u.username = $1;', 
            [username]
        )
    }

    // TODO: Add pagination to get tasks by page size. The current impl will dump all tasks which can take a while if there is a lot
    async getAllTasks(): Promise<any> {
        const query = `SELECT
                t.task_id,
                u_created.username AS created_by,
                u_assigned.username AS assigned_to,
                t.created_by AS created_by_id, 
                t.assigned_to AS assigned_to_id,
                t.title,
                t.description,
                t.due_date,
                t.created_at,
                t.modified_at,
                jsonb_agg(
                    jsonb_build_object(
                        'task_id', tc.task_id,
                        'task_field', tc.task_field,
                        'content', tc.content,
                        'attachment', tc.attachment
                    )
                ) AS task_contents
            FROM Tasks AS t
            LEFT JOIN TaskContent AS tc ON t.task_id = tc.task_id
            LEFT JOIN Users AS u_created ON t.created_by = u_created.id
            LEFT JOIN Users AS u_assigned ON t.assigned_to = u_assigned.id
            GROUP BY t.task_id, u_created.username, u_assigned.username;`

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
                \${created_by_id}, 
                NULLIF(\${assigned_to_id}, null::uuid),
                \${title}, 
                \${description}, 
                NOW(), 
                NOW(),
                NULLIF(\${due_date}, null::timestamp)
            )
            ON CONFLICT (task_id) DO UPDATE 
            SET 
                created_by = \${created_by_id},
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
        `
    
        const params: Task = JSON.parse(JSON.stringify(task))
        const userIds = await this.findUserIdByName(params)
        if (userIds.error) {
            return Promise.reject(new Error(userIds.message))
        }

        console.log('Found users: ', userIds)
        params.created_by_id = userIds.created_by_id
        params.assigned_to_id = userIds.assigned_to_id
        
        console.log("DB Creating/Updating TASK: ", params)
        return this.db.none(query, params)
    }

    async findUserIdByName(params: Task) {

        try {
            const query = `
              SELECT
                (SELECT id FROM Users WHERE username = $1) AS created_by_id,
                (SELECT id FROM Users WHERE username = $2) AS assigned_to_id
            `;

            const result = await this.db.oneOrNone(query, [params.created_by, params.assigned_to]);
        
            // Check if assigned_to user is not found
            if (params.assigned_to && !result?.assigned_to_id) {
                return {message: "User not found: " + params.assigned_to, error: true}
            }

            return {
              created_by_id: result?.created_by_id || null, // Handle potential undefined
              assigned_to_id: result?.assigned_to_id || null, // Handle potential undefined
            };
        } catch (err) {
            console.error("Error finding user IDs:", err);
            throw err;
        }
    }
}





