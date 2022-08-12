const serverless = require("serverless-http");
const express = require('express');
const cors = require('cors');
const app = express();
const timeZoneData = require('./data.js');


app.use(cors());

app.get('/api', (req, res) => {
    res.status(200).send("hello");
})

app.get('/api/:country', function(req, res) {
    let search = timeZoneData[req.params.country]
    let date = new Date.UTC()
    date.setHours(date.getHours() + search)
    if (search % 1 !== 0) {
        date.setMinutes(date.getMinutes() + 30)
    }
    let formattedDate = JSON.stringify(new Date(date))
   res.send(formattedDate)
});

module.exports.handler = serverless(app);