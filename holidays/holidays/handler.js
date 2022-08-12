const serverless = require("serverless-http");
const express = require("express");
const app = express();
const Holidays = require('date-holidays');
const hd = new Holidays();
const cors = require('cors');
const body_parser = require('body-parser');
const port = 5000;


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
    message: "Hello, please add a 2 letter country abbreviation to the end of the URL for the countries holidays",
  });
});

app.get("/:country", (req, res, next) => {
  if (req.params.country === "UK") {
    hd.init('GB')
    const result = hd.getHolidays(2022)
    console.log(result)
  return res.send(result)
  } else {
  hd.init(`${req.params.country}`)
  const result = hd.getHolidays(2022)
  return res.send(result)
}
});


app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
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
