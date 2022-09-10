const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing json data
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// `urlencoded` data represents a URL encoded form. If we had a HTML form with fields: `username` and `password`, our urlencoded data would be "username=JohnAppleseed&password=passw0rd"
// The extended option allows us to choose whether we want to parse strings with the included qs library (qs: parses and stringifies queries, provides additional security)



// Routes
// send the index.html file always
// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"));
//   });

// Start Express server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
