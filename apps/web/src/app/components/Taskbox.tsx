import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { Chip } from '@mui/material';
import useSWR from 'swr';
import type { Task } from '@app/models';
import { getServerData, TASK_URL } from './Utils';

const defaultColumns: GridColDef[] = [
  { field: 'task_id', headerName: 'Task ID', width: 150, filterable: true, flex: 1 },
  { field: 'title', headerName: 'Title', width: 150, filterable: true, flex: 1 },
  { field: 'description', headerName: 'Description', width: 150, filterable: true, flex: 1 },
  { field: 'created_by', headerName: 'Created By', width: 150, filterable: true, flex: 1 },
  { field: 'assigned_to', headerName: 'Assigned To', width: 150, filterable: true, flex: 1 },
  { field: 'due_date', headerName: 'Due Date', width: 150, filterable: true, flex: 1 },
  { field: 'created_at', headerName: 'Created At', width: 150, filterable: true, flex: 1 },
  { field: 'modified_at', headerName: 'Modified At', width: 150, filterable: true, flex: 1 },
]

export default function TaskBox() {

  const { data, isLoading } = useSWR(TASK_URL, getServerData, {
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
      uniqueTaskFields.add(content.task_field);
    });
  });

  // Create dynamic columns
  const dynamicColumns: GridColDef[] = Array.from(uniqueTaskFields).map(field => ({
    field,
    headerName: field,
    width: 150,
    flex: 1,
    filterable: true,
    valueGetter: (params: { row: Task }) => {
      const matchingContent = params.row.task_contents.find(content => content.task_field === field);
      return matchingContent ? matchingContent.content : "";
    },
    renderCell: (params: { row: Task }) => {
      const matchingContent = params.row.task_contents.find(content => content.task_field === field);
      return matchingContent ? <Chip label={matchingContent.content} variant="outlined" /> : null;
    },
  }));

  // Combine static and dynamic columns
  const columns = [...defaultColumns, ...dynamicColumns];

  const rowsWithIds = taskData.map(task => ({ ...task, id: task.task_id }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rowsWithIds} columns={columns} getRowId={(row) => row.id} />
    </div>
  );
};








