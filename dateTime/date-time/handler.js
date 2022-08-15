const serverless = require("serverless-http");
const express = require('express');
const helmet = require('helmet');
const app = express();
const body_parser = require('body-parser');
const timeZoneData = require('./data.js');
const cors = require('cors')
const port = 3000

app.use(body_parser.json());
app.use(helmet());

app.use(cors({
  origin: (origin, callback) => {
      if (!origin || [
          'http://ec2-52-91-41-236.compute-1.amazonaws.com'
      ].includes(origin)) {
          return callback(null, true);
      }
      return callback(new Error(origin, 'Not allowed by CORS.'));
  }
}));

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello, please add a 2 letter country abbreviation to the end of the URL to get the time",
  });
});


app.get("/:country", function(req, res) {
    let search = timeZoneData[req.params.country]
    let date = new Date()
    date.setHours(date.getHours() + search)
    if (search % 1 !== 0) {
        date.setMinutes(date.getMinutes() + 30)
    }
    let formattedDate = JSON.stringify(new Date(date))
   res.send(formattedDate)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports.handler = serverless(app);
