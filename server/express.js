// require module
const INDEX = require('./index')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

// Import routes
const assetsRouter = require("./assets-router");
const userRoutes = require ('./routes/User')
const contactRoutes = require ('./routes/Contact')

// Initialize the app
const app = express()

// Use middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Server static file
app.use('/',express.static(path.join(__dirname,'public')));
app.use('/src',assetsRouter);

// Use route handlers
app.use('/',userRoutes);
app.use('/',contactRoutes);

// API endpoint
app.get('/api/v1', (req, res) => {
    res.json({
      project:"React Project",
      from:"COMP229"
    });
});

app.get('/*',function (req,res){
  res.sendFile(path.join(__dirname,'../public','index.html'))
});
// Additional middlewares
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

module.exports = app;