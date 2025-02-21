import type { TaskContent } from '@app/models';


export interface CreateTaskFormData {
  title: string;
  description: string;
  due_date?: string;
  assigned_to?: string;
  created_by: string;
  task_contents: TaskContent[];
  task_id?: string | null;
}