'use client'
import React from "react";
import { getCookie } from 'cookies-next';
import { Button } from '@mui/material';
import Taskbox from "../components/Taskbox";
import CreateTaskForm from "./CreateTask";


function TaskPage() {

  const cookie = getCookie('user-info')

  if (!cookie) {
    return(
      <div>
        <h1><b>User not logged in!</b></h1>
        <br/>
        <Button href="/users" variant="contained" color="secondary">
          Go to Login Page
        </Button>
      </div>
    )
  }

  return(
    <div>
      <h1><b>Task Page</b></h1>
      <Taskbox />
      <CreateTaskForm />
    </div>
  )
}

export default TaskPage;