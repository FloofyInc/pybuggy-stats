require('dotenv').config();

const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const Users = require('./modules/users');
const Data = require('./modules/data');
const UserData = require('./modules/user-data');
const Errors = require('./modules/errors');
const errorParser = require('./modules/error-parser');
var os = require('os');
var pty = require('node-pty');
const fs = require('fs');
var csv = require('csv-express');

const fileName = "./stats/data-" + Date.now() + '.csv'
// user, problem, problempt attemp #, user attempt #, elapsed/attempt, attempt start time, user type, submitted

// this is our MongoDB database
const dbRoute = process.env.DB_HOST;
// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true});

console.log("\nReading problem data...\n");

function toCSV(student) {
    return student._id + "," + student.email + "," + student.username  + "," + student.firstname + "," + student.lastname + "," + student.type + "," + student.createdAt;
}

Users.getAll((err, data) => {
    data.forEach(student => {
        fs.appendFileSync('stats/students.csv', toCSV(student) + "\n");
    });

    console.log("DONE!!");
});


console.log("\n------------------------------\n");
process.on('SIGINT', function() {
    console.log("ok.");
    process.exit();
});