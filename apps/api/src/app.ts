import express from 'express'
import DatabaseConnector from '@app/database'


const app = express()
const port = 3000
const db = new DatabaseConnector()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/newpage', (req, res) => {
  res.send('newpage 1')
  var data = db.getUsers()
  console.log(data)
  return 
})

app.get('/users', async (req, res) => {
  var data = await db.getUsers()
    .then((data) => {
      console.log("app.js retrieved:")
      var converted = JSON.stringify(data)
      console.log(converted)

      res.send(converted)
    })
    .catch((error) => { 
      console.log('ERROR:', error);
      res.send('users error: ' + error);
    });

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
