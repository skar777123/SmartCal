import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.URI).then(() => {
    console.log("Connected to MongoDB");
  });

  console.log(`Server is running on port ${process.env.PORT}`);
});
