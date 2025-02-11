
# Requirements
Basic API for a task management system that supports CRUD operations for tasks, user authentication, and **real-time updates**.

Tasks should have a title, description, deadline, assignee, as well as the ability to add custom parameters (e.g. the user can add a custom text field called "Location").

# Business Requirements
- As a user, I can create a task with a title, description, deadline, assignee, and custom parameters
- As a user, I can view tasks in a simple list view that updates in real time
- As a user, I can view/filter tasks by any field
- As a user, I can update existing tasks
- As a user, I can delete existing tasks
#### Stretch Goals
- As a user, I can upload and attach files to tasks
- As a user, I can assume the role of an admin or normal user
- As a dev, I can authenticate users using JWT


# Design

### High Level Overview

The frontend entry point uses a simple NextJS UI to fetch data from the backend.

The backend entry point uses Express to route endpoints through the `app.js` file. When requests are received, corresponding calls will be made to the `controller.js` file, which is responsible for updating/retrieving data from the database, transforming the data into server models, and any backend logic needed. This separation of concerns allows us to keep our router dumb and add more controllers for specialized logic in the future.

The `DatabaseConnector` exists in a separate package which holds all the SQL commands and PostgreSQL connection pool. This allows other apps to utilize the same database by importing this package.

The `Models` package allows the backend and frontend to utilize the same object definitions. While it's more common to distinguish the backend and frontend into separate models so that we only send the client what is explicitly needed, the scope of this project is small enough to reuse existing models.

![](HighLevelOverview.svg)

### Database Design

This database is separated into 4 tables:
- **Users** - Stores user data
- **Auth** - Stores authenticating user login data
- **Tasks** - Stores required Task information and metadata
- **TaskContent** - Stores optional Task information, custom fields. `task_field` allows for custom field names. `attachment` is a boolean to indicate if the field is an attachment. `content` is the custom field content (in the case that `attachment = true`, content will be a URL to the blob storage provider)

![](./sql/database_design.svg)

### Database Setup
[Database Setup File](./database_setup.sql)


# Cost Analysis
