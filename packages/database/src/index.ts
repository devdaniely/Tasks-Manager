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
            max: 10, // Limit connections to prevent overload
            idleTimeoutMillis: 30000 // Close idle connections after 30s
        });
        console.log("Constructed DatabaseConnector");
    }

    async getAllUsers(): Promise<any> {
        console.log("test db connect");
        return this.db.any('SELECT * FROM "Users"');
        /*
        this.db.any('SELECT * FROM "Users"')
            .then((data) => {
                console.log('DATA:', data)
                users = data
            })
            .catch((error) => {
                console.log('ERROR:', error)
            })*/
    }

    async getUserByUsername(username: string): Promise<any> {
        return this.db.one(
            'SELECT * FROM "Users" AS u INNER JOIN "Auth" AS a ON u.id = a.id WHERE u.username = $1', 
            [username]
        )
    }

    async createOrUpdateTask(task: Task) {
        const query = `
        WITH upsert_task AS (
            INSERT INTO Tasks (task_id, created_by, assigned_to, title, description, modified_at, due_date)
            VALUES (
                \${task_id}, 
                \${created_by}, 
                \${assigned_to}, 
                \${title}, 
                \${description}, 
                NOW(), 
                \${due_date}
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
        
        console.log("CALLING DB")
        console.log(params)
        // const params = {
        //     task_id: "bdeedbe2-8f41-4d60-9b76-1bba7f67a2c1",
        //     created_by: "9127421c-b3b9-4ccb-970a-dd9adf5fc131",
        //     assigned_to: "22222222-2222-2222-2222-222222222222",
        //     title: "Test Task",
        //     description: "This is a sample task",
        //     due_date: "2025-02-20T12:00:00Z",
        //     task_contents: JSON.stringify([
        //         { task_field: "customField1", content: "customData1", attachment: false },
        //         { task_field: "customField2", content: null, attachment: false }
        //     ])
        // };
        return this.db.none(query, params);
    }

}





