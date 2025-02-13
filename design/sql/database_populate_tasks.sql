

INSERT INTO Tasks (task_id, created_by, assigned_to, title, description, created_at, due_date)  VALUES ('11111111-1111-1111-1111-111111111111', '9127421c-b3b9-4ccb-970a-dd9adf5fc131', '9127421c-b3b9-4ccb-970a-dd9adf5fc131', 'Test Title', 'Test Description', NOW(), NOW() + INTERVAL '7 days');
INSERT INTO TaskContent (task_id, task_field, content, attachment) VALUES ('11111111-1111-1111-1111-111111111111', 'custom_field1', 'testVAlue', FALSE);