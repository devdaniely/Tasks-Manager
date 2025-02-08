import express from 'express'
import DatabaseConnector from './databaseConnector.js'


const app = express()
const port = 3000
const db = new DatabaseConnector()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/newpage', (req, res) => {
  res.send('newpage 1')
  db.test()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
