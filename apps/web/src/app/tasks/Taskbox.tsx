'use client'
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Chip, Tooltip, IconButton, Modal, Box, Typography } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment'
import EditIcon from '@mui/icons-material/Edit';
import { redirect } from 'next/navigation';
import useSWR from 'swr';
import type { Task } from '@app/models';
import { API_TASKS_URL, modalStyle } from '../components/Constants';
import { getServerData, getUser } from '../components/Utils';
import EditTaskForm from './EditTask';

const defaultColumns: GridColDef[] = [
  { field: 'task_id', headerName: 'Task ID', width: 150, filterable: true, flex: 1 },
  { field: 'title', headerName: 'Title', width: 150, filterable: true, flex: 1 },
  { field: 'description', headerName: 'Description', width: 150, filterable: true, flex: 1 },
  {
    field: 'created_by',
    headerName: 'Created By',
    width: 150,
    filterable: true,
    flex: 1,
    renderCell: (params: { row: Task }) => (
      <Tooltip title={params.row.created_by_id || "No ID Available"}>
        <span>{params.row.created_by}</span> 
      </Tooltip>
    )
  },
  {
    field: 'assigned_to',
    headerName: 'Assigned To',
    width: 150,
    filterable: true,
    flex: 1,
    renderCell: (params: { row: Task }) => (
      <Tooltip title={params.row.assigned_to_id || "No ID Available"}> 
        <span>{params.row.assigned_to}</span>
      </Tooltip>
    )
  },
  { field: 'due_date', headerName: 'Due Date', width: 150, filterable: true, flex: 1 },
  { field: 'created_at', headerName: 'Created At', width: 150, filterable: true, flex: 1 },
  { field: 'modified_at', headerName: 'Modified At', width: 150, filterable: true, flex: 1 },
]

export default function TaskBox() {

  // Setup edit handlers
  const [adminRole, setAdminRole] = useState(false);
  const [editTaskClicked, setEditTaskClicked] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const editTask = async (task: Task) => {
    const userInfo = await getUser()
    if (userInfo.role === 'admin') {
      setAdminRole(true)
      setTaskToEdit(task)
      setIsEditModalOpen(true)
    }
    setEditTaskClicked(true)
  };
  const closeEditTask = () => {
    setAdminRole(false)
    setTaskToEdit(null)
    setIsEditModalOpen(false)
    setEditTaskClicked(false)
  }


  // Fetch data
  const { data, isLoading } = useSWR(API_TASKS_URL, getServerData, {
    refreshInterval: 3000,
    keepPreviousData: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No Tasks available!</div>;
  }

  const taskData: Task[] = JSON.parse(data.data);

  // Extract unique task_field names
  const uniqueTaskFields = new Set<string>();
  taskData.forEach(task => {
    task.task_contents.forEach(content => {
      if (content.task_field) {
        uniqueTaskFields.add(content.task_field);
      }
    });
  });

  // Create dynamic columns
  let dynamicColumns: GridColDef[] = Array.from(uniqueTaskFields).map(field => ({
    field,
    headerName: field,
    width: 150,
    flex: 1,
    filterable: true,
    valueGetter: (params: { row: Task }) => {
      if (!params || !params.row) return "";
      const matchingContent = params.row.task_contents.find(content => content.task_field === field);
      return matchingContent ? matchingContent.content : "";
    },
    renderCell: (params: { row: Task }) => {
      if (!params || !params.row) return ""; 
      const matchingContent = params.row.task_contents.find(content => content.task_field === field);
      if (matchingContent && matchingContent.content) {
        // Create attachment icon if exists
        if (matchingContent.attachment) {
          return (
            <Tooltip title={matchingContent.content}>
              <IconButton aria-label="attachment" onClick={() => matchingContent.content && redirect(matchingContent.content)}>
                  <AttachmentIcon />
              </IconButton>
            </Tooltip>
          )
        }
        return (<Chip label={matchingContent.content} />)
    }
    return null
    },
  }));

  // Add Edit button to end of columns
  dynamicColumns = [
    ...dynamicColumns,
    {
        field: 'Edit',
        headerName: 'Edit',
        width: 100, 
        renderCell: (params: { row: Task }) => (
          <IconButton aria-label="Edit" onClick={() => editTask(params.row)}>
            <EditIcon />
          </IconButton>
        ),
    }]


  // Combine static and dynamic columns
  const columns = [...defaultColumns, ...dynamicColumns];

  const rowsWithIds = taskData.map(task => ({ ...task, id: task.task_id }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rowsWithIds} columns={columns} getRowId={(row) => row.id} />
        <Modal
          open={editTaskClicked && !adminRole}
          onClose={closeEditTask}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Only admins can edit tasks!
            </Typography>
          </Box>
        </Modal>

      {isEditModalOpen && taskToEdit && (
        <EditTaskForm
          open={isEditModalOpen}
          handleClose={closeEditTask}
          taskDataParam={taskToEdit}
        />
      )}
    </div>
  );
};




