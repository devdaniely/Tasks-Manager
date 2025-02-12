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

export interface Task {
    id: string;
    title: string;
    description: string;
    created_at: string;
    user_id: string;
}