const express = require('express');

const app = express();


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/main.html");
});

app.get('/main', function (req, res) {
    res.sendFile(__dirname + "/public/main.html");
});

app.listen(3000, function () {
    console.log("Express server started on port 3000");
});
