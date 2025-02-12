import bcrypt from 'bcryptjs'
import CryptoJS from 'crypto-js'
import DatabaseConnector from '@app/database'
import { User } from '@app/models'

const db: DatabaseConnector = new DatabaseConnector();

export async function getAllUsers(req, res) {
    var data = await db.getAllUsers()
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
}

export async function loginUser(req, res) {
    if (!req.body.username || !req.body.password) {
        console.log("loginUser: Missing username or password");
        res.status(400).send('Missing username or password');
        return;
    }

    const username = req.body.username;
    const password = CryptoJS.AES.decrypt(req.body.password, "pirros_passphrase").toString(CryptoJS.enc.Utf8);

    // Since we are not using HTTPS, check if pw matches
    var data = await db.getUserByUsername(username)
    .then((data) => {        
        // Check password
        bcrypt.compare(password, data.hash_pw)
            .then((isMatch) => {
                if (isMatch) {
                    var user = new User(data);
                    console.log("User logged in!: ", user)
                    res.status(200).send(user);
                } else {
                    console.log('User password is incorrect!');
                    res.status(400).send('User password is incorrect!');
                }
            })
            .catch((compareError) => {
                console.error('Error during bcrypt comparison:', compareError);
                res.status(500).send('Internal server error during password comparison.');
            });

        
    })
    .catch((error) => { 
        console.log('ERROR:', error);
        res.status(400).send('loginUser error: ' + error);
    });
}