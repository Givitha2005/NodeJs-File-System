require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to our Node js Fie System");
});

// POST REQUEST
app.post("/create", (req, res) => {

  const timestamp = Date.now();

  const dateTime = new Date();
  const date = `${dateTime.getDate()}`;
  const month = `${dateTime.getMonth() + 1}`;
  const year = dateTime.getFullYear();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const seconds = dateTime.getSeconds();

  const fileName = `${date}.${month}.${year}-${hours}.${minutes}.${seconds}`;

  fs.writeFile(`./textfile/${fileName}.txt`, `${timestamp}`, (err) => {
    if (err) {
      console.log({message: "Error in creating a text file"});
      res.status(400).send(`Error: ${err}`);
    } else {
      console.log("Text file created successfully");
      res.status(201).send({message: `Text file ${fileName}.txt is created`});
    }
  });
});

// GET REQUEST
app.get("/get", (req, res) => {
  fs.readdir("./textfile", (err, files) => {
    if (err) {
      res.status(400).send({message: "Unable to get files from the folders"});
    } else {
      console.log("Successfully got all the files from the folder");
      res.status(200).send({message: `The files got from the folder are : ${files}`} );
    }
  });
});

const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
  console.log(`Application is running on PORT ${PORT}`);
});