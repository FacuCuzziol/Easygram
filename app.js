const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const {MONGOURI} = require('./keys');
const cors = require('cors')
const path = require('path')
app.use(cors())




mongoose.connect(process.env.MONGODB_URI || MONGOURI,{
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


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html')); //relative path
    })
}

app.listen(PORT,()=>{
    console.log("server is running on",PORT);
})