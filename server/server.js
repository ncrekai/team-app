const app = require('./express')

const config = require('./config/config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,  
    useUnifiedTopology: true
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.error(`Database connection failed: ${err.message}`))

app.listen(config.port, () => console.info(`Server started on the port: ${config.port}`));