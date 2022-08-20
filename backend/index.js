const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
connectToMongo();

const app = express();
const port = 5000;
app.use(cors())
app.use(express.json())
//Available routes
app.use("/api/a", require('./routes/auth.js'));
app.use("/api/c", require('./routes/contacts.js'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});