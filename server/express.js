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
const tripRoutes = require ('./routes/Trip')
const profileRoutes = require ('./routes/Profile')
const authRoutes = require ('./routes/authRoutes')
const wishlistRoutes = require ('./routes/Wishlist')

// Initialize the app
const app = express()

// Use middleware to handle JSON and URL-encoded data, wishlistRoutes
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
app.use('/trips', tripRoutes);
app.use('/profiles', profileRoutes);
app.use('/wishlists', wishlistRoutes);
app.use('/api/auth', authRoutes);

// API endpoint
app.get('/api/v1', (req, res) => {
    res.json({
      project:"React Project",
      from:"COMP229"
    });
});

app.get('/api/contacts', async (req, res) => {
  try{
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
});

app.get('/*',function (req,res){
  res.sendFile(path.join(__dirname,'../public','index.html'))
});


module.exports = app;