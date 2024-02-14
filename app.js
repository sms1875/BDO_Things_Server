const express = require('express');
const MarketApi = require('./MarketApi');

const app = express();


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/main.html");
});

app.get('/main', function (req, res) {
    res.sendFile(__dirname + "/public/main.html");
});

app.get('/marketWaitList', async function (req, res) {
    try {
        const marketWaitList = await MarketApi.getWorldMarketWaitList();
        
        if (marketWaitList) {
            res.status(200).json(marketWaitList);
        } else {
            res.status(500).json({ error: 'Error fetching market wait list' });
        }
    } catch (error) {
        console.error('Error fetching market wait list:', error);
        res.status(500).json({ error: 'Error fetching market wait list' });
    }
});

app.listen(3000, function () {
    console.log("Express server started on port 3000");
});
