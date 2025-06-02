const express = require('express')
const nodemailer = require('nodemailer')
const SendMail = (req,res) => {
    const Transporter = nodemailer.createTransport({ 
        service :'gmail',
        auth :{
            user : "khyatipatamsetti09@gmail.com",
            pass : "jcmg wurn vrel ajvk"
        }
    }) 
    const MailOptions = {
        from : "khyatipatamsetti09@gmail.com",
        to:req.body.email,
        subject:"We will get back to you",
        text: `
            Thank you for reaching out to us. We are currently reviewing your query and appreciate your patience during this process.\n
            Our team is committed to providing you with a thorough response. We will check the details of your request and get back to you shortly with the information you need.\n
            If you have any further questions or additional information to provide in the meantime, please feel free to reply to this email.\n
            Thank you for your understanding.
        `
    }
    Transporter.sendMail(MailOptions,(err,info) => {
        if (err)
        {
            return res.status(500).json(err)
        }
        return res.status(200).json('Mail Sent Successfully')
    })
}
exports.SendMail = SendMail;