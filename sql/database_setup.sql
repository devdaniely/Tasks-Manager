/*
Only create this user once for db access. Temporarily giving admin rights

CREATE USER appUser WITH SUPERUSER PASSWORD 'pirrospw';
*/

CREATE TABLE "Users" (
  "id" uuid PRIMARY KEY,
  "username" varchar,
  "role" varchar,
  "created_at" timestamp
);

CREATE TABLE "Auth" (
  "id" uuid PRIMARY KEY,
  "hash_pw" varchar,
  "salt" varchar
);

CREATE TABLE "Tasks" (
  "task_id" integer PRIMARY KEY,
  "created_by" uuid,
  "assigned_to" uuid,
  "title" varchar,
  "description" varchar,
  "created_at" timestamp,
  "due_at" timestamp
);

CREATE TABLE "TaskContent" (
  "task_id" integer,
  "task_field" varchar,
  "content" varchar,
  "attachment" boolean,
  PRIMARY KEY ("task_id", "task_field")
);

COMMENT ON COLUMN "TaskContent"."task_field" IS 'Name of field';

COMMENT ON COLUMN "TaskContent"."content" IS 'Url if attachment is true';

ALTER TABLE "Auth" ADD FOREIGN KEY ("id") REFERENCES "Users" ("id");

ALTER TABLE "Tasks" ADD FOREIGN KEY ("created_by") REFERENCES "Users" ("id");

ALTER TABLE "Tasks" ADD FOREIGN KEY ("assigned_to") REFERENCES "Users" ("id");

ALTER TABLE "Tasks" ADD FOREIGN KEY ("task_id") REFERENCES "TaskContent" ("task_id");

CREATE EXTENSION "uuid-ossp";
CREATE EXTENSION "pgcrypto";