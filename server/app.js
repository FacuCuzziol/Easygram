const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const {MONGOURI} = require('./keys');
const cors = require('cors')
app.use(cors())




mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo');
});
mongoose.connection.on('error',(error)=>{
    console.log('connecting error', error);
});
require('./models/User');
require('./models/Post');
app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

app.listen(PORT,()=>{
    console.log("server is running on",PORT);
})