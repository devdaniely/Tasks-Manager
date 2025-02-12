declare class User {
    id: string;
    username: string;
    role?: string;
    created_at?: string;
    constructor(data: any);
}
interface Task {
    id: string;
    title: string;
    description: string;
    created_at: string;
    user_id: string;
}

export { Task, User };
