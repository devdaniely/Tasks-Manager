'use client'
import React, { useEffect, useState } from "react";
import { getCookie } from 'cookies-next';
import { Button } from '@mui/material';
import { USER_COOKIE_KEY } from "../components/Constants";
import Taskbox from "../components/Taskbox";
import CreateTaskForm from "./CreateTask";


function NotLoggedIn() {
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

function TaskPage() {

  const [hasCookie, setHasCookie] = useState(false); // State for cookie existence

  useEffect(() => {
    const cookie = getCookie(USER_COOKIE_KEY)
    if (cookie) {
      setHasCookie(true)
    }
  }, [])

  return(
    <div>
      <h1><b>Task Page</b></h1>
      {hasCookie && <Taskbox />}
      {hasCookie && <CreateTaskForm />}
      {!hasCookie && <NotLoggedIn />}
    </div>
  )
}

export default TaskPage;