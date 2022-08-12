const serverless = require("serverless-http");
const express = require("express");
const app = express();
const body_parser = require('body-parser');
const populationData = require('./data.js');
const cors = require('cors')
const port = 4000;


app.use(body_parser.json());


app.use(cors({
  origin: (origin, callback) => {
      if (!origin || [
          'http://localhost:8080'
      ].includes(origin)) {
          return callback(null, true);
      }
      return callback(new Error(origin, 'Not allowed by CORS.'));
  }
}));


app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/:country", function(req, res) {
  let result = JSON.stringify(populationData[req.params.country])
  res.send(result)
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
module.exports.handler = serverless(app);
