const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require ('dotenv')



dotenv.config()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
require('./db/connect')

//require routes
const company = require('./routes/auth')


//use routes
app.use('/companys',company)



app.get('/',(req,res)=>{
    res.status(200).json({message : 'okay'})
})


app.listen(process.env.PORT || 5000)
