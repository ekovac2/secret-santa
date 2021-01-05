const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

const db = require("./models");

db.sequelize.sync().then(() => {
  console.log('Drop and Resync Db');
  //initial();
});

function initial() {
  db.role.create({
    id: 1,
    name: "user"
  });
  db.role.create({
    id: 2,
    name: "admin"
  });
}

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Secret Santa Application."
  });
});

require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});