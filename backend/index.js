import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/index.js';
import { app } from './app.js'; // Make sure to import the app from app.js

dotenv.config();

const port = process.env.PORT

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
