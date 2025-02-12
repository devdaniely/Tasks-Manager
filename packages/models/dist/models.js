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
export {
  User
};
//# sourceMappingURL=models.js.map