import express from 'express'
import bodyParser from 'body-parser';
import { getAllUsers, loginUser } from './controller.js';

const app = express()
const port = 3000
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', getAllUsers)

app.post('/loginUser', loginUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
