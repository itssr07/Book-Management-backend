//prints the value of x in the console
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Book = require("./routes/Books");

const mongoURI =
  "mongodb+srv://ranjanshitanshu10:Q5qYq8IndGhGUQVg@cluster0.ckkwtsk.mongodb.net/";

const port = 5000;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once("open", () => {
  console.log("Connected to DB");
});

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/book", Book);

app.listen(port, () => console.log(`Server Up and Running @ PORT: ${port}`));
