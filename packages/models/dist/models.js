// src/models.ts
var User = class {
  id;
  username;
  role;
  created_at;
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.role = data.role;
    this.created_at = data.created_at;
  }
};
var Task = class {
  task_id;
  created_by;
  assigned_to;
  title;
  description;
  created_at;
  modified_at;
  due_date;
  // Task Content
  task_contents;
  constructor(data) {
    this.task_id = data.task_id;
    this.created_by = data.created_by;
    this.assigned_to = data.assigned_to ? data.assigned_to : data.created_by;
    this.title = data.title;
    this.description = data.description;
    this.created_at = data.created_at;
    this.modified_at = data.modified_at ? data.modified_at : null;
    this.due_date = data.due_date ? data.due_date : null;
    this.task_contents = data.task_contents.map((content) => new TaskContent(content));
  }
};
var TaskContent = class {
  task_id;
  task_field;
  content;
  attachment;
  constructor(data) {
    this.task_id = data.task_id;
    this.task_field = data.task_field;
    this.content = data.content ? data.content : null;
    this.attachment = data.attachment ? data.attachment : false;
  }
};
export {
  Task,
  TaskContent,
  User
};
//# sourceMappingURL=models.js.map