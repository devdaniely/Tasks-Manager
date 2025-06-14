declare class User {
    id: string;
    username: string;
    role?: string;
    created_at?: string;
    constructor(data: any);
}
declare class Task {
    task_id: string;
    created_by: string;
    created_by_id?: string | null;
    assigned_to?: string | null;
    assigned_to_id?: string | null;
    title: string;
    description?: string | null;
    created_at: string;
    modified_at?: string | null;
    due_date?: string | null;
    task_contents: TaskContent[];
    constructor(data: any);
}
declare class TaskContent {
    task_id: string;
    task_field: string;
    content?: string;
    attachment?: boolean;
    constructor(data: any);
}

export { Task, TaskContent, User };
