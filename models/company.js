const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
    companyName : {
        type : String
    },
    companyDescription :{
        type : String
    },
    email :{
        type : String
    },
    password : {
        type : String
    },
    role :{
        type : String
    },
    photo : {
        type : String
    },
    events : [{
        type : mongoose.Schema.Types.ObjectId , ref :'event'
    }],
},{
    timestamps : true
})

module.exports = mongoose.model('company',companySchema)