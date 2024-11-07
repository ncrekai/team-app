// require module
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

// Import routes
const assetsRouter = require("./assets-router");
const userRoutes = require ('./routes/User')
const contactRoutes = require ('./routes/Contact')
const tripRoutes = require ('./routes/Trip')
const profileRoutes = require ('./routes/Profile')
const authRoutes = require ('./routes/authRoutes')

// Initialize the app
const app = express()

// Use middleware to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Additional middlewares
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

// Server static file
app.use('/',express.static(path.join(__dirname,'public')));
app.use('/src',assetsRouter);

// Use route handlers
app.use('/users', userRoutes);
app.use('/contacts', contactRoutes);
app.use('/trips', tripRoutes);
app.use('/profiles', profileRoutes);
app.use('/api/auth', authRoutes);

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


module.exports = app;