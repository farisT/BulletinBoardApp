const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var fs = require('fs');
require('dotenv').load();
const { Client } = require('pg');
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.set('view engine', 'pug')

app.get("/", (req, res) => {
    res.render("index", {});
})

const client = new Client({ ///info needed to connect to the database
    user: process.env.POSTGRES_USER,
    host: 'localhost',
    database: 'bulletinboard',
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,

    /// console.log (process.env.name)

})

 client.connect()
app.post("/add", (req, res) => {

   
    const query = {
        text: `INSERT INTO messages (title,body) VALUES ('${req.body.title}','${req.body.stuff}')`
    }
    const query3 = {
        text: `INSERT INTO users (users) VALUES ('${req.body.user}')`
    }
    client.query(query, (err, res) => {
        console.log(res)
        console.log(err)
        // client.end() // ends the connection with the database

    })
        client.query(query3, (err, res) => {
        console.log(res)
        console.log(err)
        // client.end() // ends the connection with the database

    })
    res.redirect("/")
})




            app.get("/display", (req, res) => {
                
                const query2 = {
                    text: `SELECT * FROM messages`
                    //`SELECT users.users,messages.user_id,messages.title,messages.body, FROM messages INNER JOIN users, ON users.id = messages.user_id;`
                }
                client.query(query2, (err, response) => {
                    allMessages = response.rows
                    console.log(err)
                    res.render("display", { allMessages: allMessages })

                })




            })





            app.listen(3000, () => {
                console.log("listening to 3000")
            })

            // SELECT users.users,messages.user_id,messages.title,messages.body, FROM messages INNER JOIN users, ON users.id = messages.user_id;
            // client.end() // ends the connection with the database
            // select users.users,messages.user_id,messages.title,messages.body,from messages INNER JOIN users, on users.id = messages.user_id