const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost/user2').then(()=>{
    console.log('succefully connected to database');
}).catch((err)=>{
    console.log('Connected  with error',err);

});