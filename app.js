// Require dotenv in app.js
require('dotenv').config();

const express  = require('express');
const app = express();
const mongoose = require('mongoose');
// Importing db.js
const db = require('./Configs/db');
//Importing Routes
const authTeacherRouter = require ('./Routes/authTeacherRouter');
const authUserRouter = require ('./Routes/authUserRouter');
const categoryRouter = require ('./Routes/categoryRouter');
const contactRouter = require ('./Routes/contactRouter');
const courseRouter = require ('./Routes/courseRouter');
const planRouter = require ('./Routes/planRouter');
const reviewRouter = require ('./Routes/reviewRouter');
const subscriptionRouter = require ('./Routes/subscriptionRouter');
const teacherRouter = require ('./Routes/teacherRouter');
const userRouter = require ('./Routes/userRouter');
const wishListRouter = require ('./Routes/wishListRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/authTeacher' , authTeacherRouter);
app.use('/api/authUser' , authUserRouter);
app.use('/api/category' , categoryRouter);
app.use('/api/contact' , contactRouter);
app.use('/api/course' , courseRouter);
app.use('/api/plan' , planRouter);
app.use('/api/review' , reviewRouter);
app.use('/api/subscription' , subscriptionRouter);
app.use('/api/teacher' , teacherRouter);
app.use('/api/user' , userRouter);
app.use('/api/wishList' , wishListRouter);


const PORT = 3000 || process.env.PORT ; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});