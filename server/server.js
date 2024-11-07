const app = require('./express')
const config = require('./config/config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Database connected successfully')
    })
    .catch(err => {
        console.error(`Database connection failed: ${err.message}`)
    })

app.listen(config.PORT, () => console.info(`Server started on the port: ${config.PORT}`));