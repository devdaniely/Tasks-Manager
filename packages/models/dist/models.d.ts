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
    assigned_to?: string;
    title: string;
    description?: string;
    created_at: string;
    modified_at?: string;
    due_date?: string;
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
