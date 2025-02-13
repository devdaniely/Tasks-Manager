/*
Only create this user once for db access. Temporarily giving admin rights

CREATE USER appUser WITH SUPERUSER PASSWORD 'pirrospw';
*/

CREATE TABLE Users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username varchar UNIQUE,
  role varchar,
  created_at timestamp
);

CREATE TABLE Auth (
  id uuid PRIMARY KEY,
  hash_pw varchar,
  salt varchar
);

CREATE TABLE Tasks (
  task_id uuid PRIMARY KEY,
  created_by uuid,
  assigned_to uuid,
  title varchar,
  description varchar,
  created_at timestamp,
  modified_at timestamp,
  due_date timestamp
);

CREATE TABLE TaskContent (
  task_id uuid,
  task_field varchar,
  content varchar,
  attachment boolean,
  PRIMARY KEY (task_id, task_field)
);

ALTER TABLE Auth ADD FOREIGN KEY (id) REFERENCES Users (id);

ALTER TABLE Tasks ADD FOREIGN KEY (created_by) REFERENCES Users (id);

ALTER TABLE Tasks ADD FOREIGN KEY (assigned_to) REFERENCES Users (id);

ALTER TABLE TaskContent ADD FOREIGN KEY (task_id) REFERENCES Tasks (task_id);

CREATE EXTENSION "uuid-ossp";
CREATE EXTENSION "pgcrypto";