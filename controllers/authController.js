const company = require('../models/company')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')



exports.register = async (req, res) => {
    const userFound = await company.find({ email: req.body.email })
    try {
        if (userFound) {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(req.body.password, salt)
            req.body.password = hash
            await company.create(req.body)
            res.status(200).json({ message: 'company account created' })
        } else {
            res.status(500).json({ message: 'Email already exist' })
        }
    } catch (error) {
        res.status(400).json({ message: 'error server' })
    }
}

exports.login = async (req, res) => {
    const foundData = await company.findOne({ email: req.body.email })
    try {
        if (foundData) {
            const isValid = await bcrypt.compare(req.body.password, foundData.password)
            if (isValid) {
                const data = {
                    id: foundData._id
                }
                const token = jwt.sign(data, process.env.SECRET)
                res.status(200).json({ message: 'you`\'re connected successefuly' })
            } else {
                res.status(500).json({ message: 'Email or password is wrong' })
            }
        } else {
            res.status(500).json({ message: 'company account dosen\'t exist' })
        }

    } catch (error) {
        res.status(400).json({ message: 'error server' })

    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const userFound = await company.findOne({ email: req.body.email })
        console.log(userFound);
        if (userFound) {
            const companyInfo = {
                id: company._id
            }
            const token = jwt.sign(companyInfo, process.env.SECRET, { expiresIn: '20m' });

            const mailPath = path.resolve('./templates/forgetPassword.ejs')
            const fileContent = fs.readFileSync(mailPath, {encoding : 'utf-8'})
            
            const mailParams = {
              name:  req.params.name
            }
        
            const render = ejs.render(fileContent,{name : mailParams.name})
    
            let transporter =   nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.MAIL, // generated ethereal user
                    pass: process.env.MAILPASSWORD, // generated ethereal password
                },
            });
        
            
            await transporter.sendMail({
                from: process.env.MAIL, // sender address
                to: "testtest20222016@gmail.com",
                subject: "Reset LINK", // Subject line
                html: render, // html body
            });
            res.status(200).json({message: "email sent"})

        }else {
            res.status(400).json({message: "email doesn't exist"})
        }
    }catch (err){
        console.log(err);
        res.status(500).json({message : 'error server'})
        }
}