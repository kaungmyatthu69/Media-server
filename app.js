
require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const fileUpload = require('express-fileupload');
const {saveFile,saveFiles ,deleteFile} = require('./utils/gallery');
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
app.use(express.json())
app.use(fileUpload());

app.use('/uploads',express.static(path.join(__dirname, 'uploads')))

app.post('/gallery',saveFile, (req, res) => {
  res.json({msg: 'File Uploaded','filename':req.body.image})
})
app.post('/galleries',saveFiles,(req,res,next)=>{
    res.json({msg: 'Files Uploaded','filename':req.body.images})
})
app.post('/deletegallery',deleteFile,(req,res,next)=>{
    res.json({msg: 'File Deleted'})
})
app.use("/users", userRouter);
app.use("/posts", postRouter  );

app.use((err,req,res,next)=>{
  err.status = err.status || 200;
  res.status(err.status).json({con:false,msg:err.message })
})


app.get('*', (req, res) => {
  res.status(404).send('404 Not Found');
});
app.listen( process.env.PORT , () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})