export class User {
    id: string;
    username: string;
    role?: string;
    created_at?: string;

    constructor(data: any) {
        this.id = data.id;
        this.username = data.username;
        this.role = data.role;
        this.created_at = data.created_at;
      }
}

export class Task {
    task_id: string
    created_by: string
    created_by_id?: string | null
    assigned_to?: string | null
    assigned_to_id?: string | null
    title: string
    description?: string | null
    created_at: string
    modified_at?: string | null
    due_date?: string | null
    
    // Task Content
    task_contents: TaskContent[]

    constructor(data: any) {
        this.task_id = data.task_id;
        this.created_by = data.created_by;
        this.assigned_to = data.assigned_to ? data.assigned_to : data.created_by; // Assigned to self by default
        this.title = data.title;
        this.description = data.description;
        this.created_at = data.created_at;
        this.modified_at = data.modified_at ? data.modified_at : null;
        this.due_date = data.due_date ? data.due_date : null;
        this.task_contents = data.task_contents.map((content: any) => new TaskContent(content));
    }
}

export class TaskContent {
    task_id: string
    task_field: string
    content?: string
    attachment?: boolean

    constructor(data: any) {
        this.task_id = data.task_id;
        this.task_field = data.task_field;
        this.content = data.content ? data.content : null;
        this.attachment = data.attachment ? data.attachment : false;
      }
}