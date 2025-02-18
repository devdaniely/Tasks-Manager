import bcrypt from 'bcryptjs'
import CryptoJS from 'crypto-js'
import DatabaseConnector from '@app/database'
import { Task, User } from '@app/models'

const db: DatabaseConnector = new DatabaseConnector()

const responseMsg = {
    "message": "placeholder",
    "data": ""
}

// Testing function
export async function getAllUsers(req, res) {
    var data = await db.getAllUsers()
        .then((data) => {
            console.log("app.js retrieved:")
            var converted = JSON.stringify(data)
            console.log(converted)

            res.send(converted)
        })
        .catch((error) => { 
            console.log('ERROR:', error)
            res.send('users error: ' + error)
        })
}

export async function loginUser(req, res) {
    if (!req.body.username || !req.body.password) {
        responseMsg.message = "Missing username or password"
        responseMsg.data = ""
        res.status(400).send(responseMsg)
        return
    }

    const username = req.body.username
    const password = CryptoJS.AES.decrypt(req.body.password, "pirros_passphrase").toString(CryptoJS.enc.Utf8)

    // Since we are not using HTTPS, check if pw matches
    var data = await db.getUserByUsername(username)
    .then((data) => {        
        // Check password
        bcrypt.compare(password, data.hash_pw)
            .then((isMatch) => {
                if (isMatch) {
                    var user = new User(data)
                    console.log("User logged in!: ", user)

                    responseMsg.message = "User logged in!"
                    responseMsg.data = JSON.stringify(user)
                    res.status(200).send(responseMsg)
                } else {
                    console.log('User password is incorrect!')
                    responseMsg.message = "User password is incorrect!"
                    responseMsg.data = ""
                    res.status(400).send(responseMsg)
                }
            })
            .catch((compareError) => {
                console.error('Error during bcrypt comparison:', compareError)
                res.status(500).send('Internal server error during password comparison.')
            })

        
    })
    .catch((error) => { 
        console.log('ERROR:', error)
        responseMsg.message = "User not found"
        responseMsg.data = JSON.stringify(error)
        res.status(400).send(responseMsg)
    })
}

export async function getAllTasks(req, res) {
    var data = await db.getAllTasks()
        .then((data) => {
            console.log("Retrieved all tasks")

            var allData: Task[] = data
            console.log(allData)

            responseMsg.message = "Retrieved all tasks"
            responseMsg.data = JSON.stringify(allData)
            res.status(200).send(responseMsg)
        })
        .catch((error) => { 
            console.log('ERROR:', error)
            responseMsg.message = "Error retrieving tasks"
            responseMsg.data = JSON.stringify(error)
            res.status(400).send(responseMsg)
        })
}

export async function createOrUpdateTask(req, res) {
    if (!req.body.task_id) {
        console.log("createOrUpdateTask: Missing required taskID")
        responseMsg.message = "Missing required taskID"
        responseMsg.data = ""
        res.status(400).send(responseMsg)
        return
    }

    const task: Task = new Task(req.body)

    var data = await db.createOrUpdateTask(task)
        .then((data) => {
            console.log("Task created/updated:", data)
            responseMsg.message = "Task created/updated"
            responseMsg.data = JSON.stringify(task)
            res.status(200).send(responseMsg)
        })
        .catch((error) => { 
            console.log('ERROR:', error)
            responseMsg.message = "Error creating/updating task"
            responseMsg.data = JSON.stringify(error)
            res.status(400).send(responseMsg)
        })
}

export async function deleteTask(req, res) {
    if (!req.body.task_id) {
        console.log("DeleteTask: Missing required taskID")
        responseMsg.message = "Missing required taskID"
        responseMsg.data = ""
        res.status(400).send(responseMsg)
        return
    }

    const task_id = req.body.task_id

    var data = await db.deleteTask(task_id)
        .then((data) => {
            console.log("Task deleted: ", task_id)
            responseMsg.message = "Task deleted successfully! TaskID: " + task_id
            responseMsg.data = ""
            res.status(200).send(responseMsg)
        })
        .catch((error) => { 
            console.log('ERROR:', error)
            responseMsg.message = "Error deleting task"
            responseMsg.data = JSON.stringify(error)
            res.status(400).send(responseMsg)
        })
}