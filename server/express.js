// require module
const INDEX = require('./index')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const assetsRouter = require("./assets-router");
const userRoutes = require ('./routes/User')
const contactRoutes = require ('./routes/Contact')
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}))
// Server static file
app.use('/',express.static(path.join(__dirname,'public')));
app.use('/src',assetsRouter);
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
module.exports = app;