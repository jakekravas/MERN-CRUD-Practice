const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server up at http://localhost:${port}`);
});