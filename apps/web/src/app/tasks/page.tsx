'use client'
import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Taskbox from "../components/Taskbox";

const page = () => {
  return(
    <div>
      <h1><b>Task Page</b></h1>
      <Stack spacing={2} direction="row">
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
      <Taskbox />
    </div>
  )
}

export default page;