const express = require('express');
const fs = require('fs');
const { tmpFilePath } = require('./dataFetcher'); // Require tmpFilePath from dataFetcher.js
const app = express();

let marketWaitListData = null; // Variable to store market wait list data

try {
    // Read marketWaitListData from marketWaitListData.json file
    marketWaitListData = JSON.parse(fs.readFileSync(tmpFilePath, 'utf8')).data;
} catch (error) {
    console.error('Error reading marketWaitListData from file:', error);
}

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/main.html');
});

app.get('/main', function (req, res) {
    res.sendFile(__dirname + '/public/main.html');
});

app.get('/marketWaitList', async function (req, res) {
    try {
        // If marketWaitListData is available, send it along with the timestamp from JSON data
        if (marketWaitListData) {
            // Get the timestamp from the JSON data
            const timestamp = JSON.parse(fs.readFileSync(tmpFilePath, 'utf8')).timestamp;
            res.status(200).json({ data: marketWaitListData, timestamp: timestamp });
        } else {
            res.status(500).json({ error: 'Market wait list data not available' });
        }
    } catch (error) {
        console.error('Error fetching market wait list data:', error);
        res.status(500).json({ error: 'Error fetching market wait list data' });
    }
});

app.listen(3000, function () {
    console.log('Express server started on port 3000');
});
