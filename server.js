import { config } from "dotenv";
// .env setup
config();

import express from "express";
import mongoose from "mongoose";
import router from "./Routes/user.js";
import  contactRouter from "./Routes/contacts.js";
// import path from "path";
const app = express();
app.use(express.json());


// User routes
// when you make new routs folder ans export path then imported file work as a middleware
app.use("/api/user/", router);


// contact router
app.use("/api/contact/", contactRouter);


mongoose.connect(process.env.MONGODB_URI, { dbName: "Mongodb_connection" })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
