# Dev Update

### Demo
<video src="./demo.mov" controls width="640"></video>

### [Click here to see the Design Document](./design/Pirros%20TaskManagement%20Design.md)

### How to Build/Run
1. Download repo
2. In PostgreSQL, create new database called `pirrosdb`
    1. Create new user with `CREATE USER appUser WITH SUPERUSER PASSWORD 'pirrospw'`
    2. In project directory, open psql console with `psql pirrosdb`
    3. Run setup file with `\i ./design/sql/database_setup.sql`
    4. Run populate file with `\i ./design/sql/database_populate.sql`
    5. Exit psql console with `ctrl + d`
3. Build the project `turbo build`
4. Run the server `turbo dev`
5. Navigate to project url `localhost:8080/tasks`
6. Find login information in [User Login Info](./design/sql/database_populate.sql)

------
------

<p align="center">
  <a href="https://pirros.com" target="blank"><img src="https://uploads-ssl.webflow.com/63e69607c67db349b0dc92e9/63fe71e9519e3f857b72dc38_logo-black.png" width="200" alt="Pirros, Inc." /></a>
</p>

# [Pirros](https://pirros.com) Engineering Take Home Project.

## Introduction

This [TurboRepo](https://turbo.build/repo) has some boilerplate for you to use to complete the take home project. All of the boilerplate is here to help you get started so that you can focus on the code rather than plumbing packages together. That being said, <u>you are free to make any changes</u> to the boilerplate that you see fit including adding additional packages or removing things that you don't need.

## Assessment: "API for a Task Management System"

### Scenario:

Build a basic API for a task management system that supports CRUD operations for tasks, user authentication, and **real-time updates**.

Please note the following requirements:

### Backend Requirements:

- Build the API using Express.js.
- Set up a Postgres database schema for tasks and users.
  - Tasks should have a title, description, deadline, assignee, as well as the ability to add custom parameters (e.g. the user can add a custom text field called "Location").
- Implement RESTful endpoints for tasks:
  - Create, Read, Update, Delete (CRUD).
  - Support filtering tasks by any of the fields.

### Frontend Requirements:

- Build a simple Next.js app to interact with the API.
- Create a simple form to add tasks and display them in a simple list view that updates in real time. If you had 2 simultaneous users on the app, you should see the new tasks the other user created without refreshing the page.
- The point is project is more about the backend so your frontend should just be there to interact with the backend. Styling doesn't matter.

### Stretch Goals:

- Allow users to upload and attach files to tasks. Use AWS S3 (or a mock alternative).
- Implement a basic JWT authentication system for user login and API protection.
- Implement role-based access control (e.g., admin vs. regular users can have different permissions).

### Notes:

- You can use the `database` package to create your Postgres schema.
- You can use the `api` app to build your Express.js server.
- You can use the `web` app as a starting point for your frontend.
- Each package and app is 100% TypeScript.
- Eslint and Prettier are also configured for developer experience.

## Getting Started

### Installation

```bash
$ pnpm install
```

### Running the app

```bash
$ turbo dev
```

### Build

```bash
$ turbo build
```

### Lint

```bash
$ turbo lint
```
