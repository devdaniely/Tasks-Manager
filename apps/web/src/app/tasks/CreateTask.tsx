'use client'
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Button, Modal, Box, TextField, Typography, Checkbox, Chip, CircularProgress, FormControlLabel } from '@mui/material';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { submitCreateTask } from '../components/Utils';
import type { CreateTaskFormData } from './Models';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function CreateTaskForm() {

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [formData, setFormData] = useState<CreateTaskFormData>({
    title: '',
    description: '',
    due_date: '',
    assigned_to: '',
    task_contents: []
  });

  const [newTaskContent, setNewTaskContent] = useState({
    task_id: '',
    task_field: '',
    content: '',
    attachment: false
  });

  const [loading, setLoading] = useState(false);


  // ========== Start Event Change Handlers ============
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setFormData({ ...formData, due_date: newValue ? newValue.format('YYYY-MM-DD') : '' });
  };
  const handleTaskContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewTaskContent({ ...newTaskContent, [name]: value });
  };
  const handleAddTaskContent = () => {
    if (newTaskContent.task_field) { // Prevent adding empty task_field
      setFormData({
        ...formData,
        task_contents: [...formData.task_contents, newTaskContent],
      });
      setNewTaskContent({ task_id: '', task_field: '', content: '', attachment: false}); // Clear input fields
    }
  };
  const handleDeleteTaskContent = (index: number) => {
    const updatedTaskContents = [...formData.task_contents];
    updatedTaskContents.splice(index, 1);
    setFormData({ ...formData, task_contents: updatedTaskContents });
  };
  // ========== End Event Change Handlers ============


  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>Open Modal Form</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modal Form
          </Typography>
          
          <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          margin="normal"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Due Date"
            value={formData.due_date ? dayjs(formData.due_date) : null}
            onChange={handleDateChange}
            slotProps={{ textField: { fullWidth: true, margin: 'normal' } }}
          />
        </LocalizationProvider>

        <TextField
          label="Assigned To"
          name="assigned_to"
          value={formData.assigned_to}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Typography variant="h6" component="h3" sx={{ mt: 2, mb: 1 }}>Task Contents</Typography>
        <Grid container spacing={2}>
          <Grid size={4}>
            <TextField
              label="Custom Field"
              name="task_field"
              value={newTaskContent.task_field}
              onChange={handleTaskContentChange}
              fullWidth
            />
          </Grid>
          <Grid size={8}>
            <TextField
              label="Content (URL for attachments)"
              name="content"
              value={newTaskContent.content}
              onChange={handleTaskContentChange}
              fullWidth
            />
          </Grid>
          <Grid size={2}>
            <FormControlLabel
              control={
                <Checkbox
                  name="attachment"
                  checked={newTaskContent.attachment}
                  onChange={(event) => setNewTaskContent({ ...newTaskContent, attachment: event.target.checked })}
                />
              }
              label="Attachment"
            />
          </Grid>
          <Grid size={12}>
            <Button variant="contained" onClick={handleAddTaskContent} fullWidth>Add Task Content</Button>
          </Grid>
        </Grid>

        {formData.task_contents.map((item, index) => (
          <Chip
            key={index}
            label={`${item.task_field}: ${item.content} [Attachment: ${item.attachment}]`}
            onDelete={() => handleDeleteTaskContent(index)}
            deleteIcon={<DeleteIcon />} 
            sx={{ margin: 0.5 }}
          />
        ))}


          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
            <Button variant="contained" onClick={async () => {
                setLoading(true)
                await submitCreateTask(formData)
              }} 
              disabled={loading}> {/* Disable while loading */}
              {loading ? <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} /> : null} {/* Loading indicator */}
            Submit
          </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateTaskForm;