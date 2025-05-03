const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1:27017/EVoting';
const mongoDB2 = "mongodb+srv://ben:fatGVv3vLW0HnXQN@cluster0.5mjks3a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"



//mongodb+srv://ben:fatGVv3vLW0HnXQN@cluster0.5mjks3a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//mongoose connection
mongoose.connect(mongoDB2,{ useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;