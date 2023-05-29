require("dotenv/config");

const Io = require("./io/io");
const user = new Io("./database/users.json");
const express = require("express");
const router = require("./routers/users.routes");

const app = express();
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5657;
app.listen(PORT, () => {
  console.log("Your server is working well");
});
