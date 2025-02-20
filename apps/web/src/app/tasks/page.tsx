'use client'
import React from "react";
import Taskbox from "../components/Taskbox";
import CreateTaskForm from "./CreateTask";

const TaskPage = () => {

  return(
    <div>
      <h1><b>Task Page</b></h1>
      <Taskbox />
      <CreateTaskForm />
    </div>
  )
}

export default TaskPage;