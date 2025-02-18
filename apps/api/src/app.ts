import express from 'express'
import bodyParser from 'body-parser';
import { createOrUpdateTask, deleteTask, getAllTasks, getAllUsers, loginUser } from './controller.js';

const app = express()
const port = 3000
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Testing endpoint
app.get('/users', getAllUsers)

app.get('/tasks', getAllTasks)

app.post('/loginUser', loginUser)

app.post('/createOrUpdateTask', createOrUpdateTask)

app.post('/deleteTask', deleteTask)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
