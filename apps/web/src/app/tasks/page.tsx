'use client'
import React, { useEffect, useState } from "react";
import { getCookie, deleteCookie } from 'cookies-next';
import { Button } from '@mui/material';
import { USER_COOKIE_KEY } from "../components/Constants";
import Taskbox from "./Taskbox";
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
      <h1><b>Tasks Page</b></h1>
      {hasCookie && <Button variant="contained" onClick={() => deleteCookie(USER_COOKIE_KEY)} href='/users'>Logout</Button>}
      {hasCookie && <Taskbox />}
      {hasCookie && <CreateTaskForm />}
      {!hasCookie && <NotLoggedIn />}
    </div>
  )
}

export default TaskPage;