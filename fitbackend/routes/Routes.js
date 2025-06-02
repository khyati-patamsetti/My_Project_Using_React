const express = require('express');
const nodemailer = require('nodemailer');
const Routes = express.Router();
const Contact = require('../controller/contact');
const controllerData = require('../controller/controller');
const Cycle = require('../models/model1'); 
const sendMail = (email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "khyatipatamsetti09@gmail.com",  
            pass: "gvjp qqla kjlv igmk",
        },
    }); 
    const mailOptions = {
        from: "khyatipatamsetti09@gmail.com",
        to: email,
        subject: "We will get back to you",
        text: `Thank you for reaching out to us. \n 
        We are currently reviewing your query and appreciate your patience during this process. \n
        Our team is committed to providing you with a thorough response. We will check the details of your request and get back to you shortly with the information you need. \n
        If you have any further questions or additional information to provide in the meantime, please feel free to reply to this email. \n
        Thank you for your understanding.`
    };
    return transporter.sendMail(mailOptions);
};
Routes.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });
        await newContact.save();
        await sendMail(email);
        res.status(200).json({ message: 'Form submitted successfully and email sent.' });
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Error submitting the form' });
    }
});
Routes.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();  
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Error fetching contact data' });
    }
});
Routes.post('/get-data', controllerData.getData);
Routes.post('/check-data', controllerData.checkData);

Routes.post('/storeCycleData', async (req, res) => {
    const { selectedDate, cycleDays } = req.body;
    try {
        const newCycle = new Cycle({
            selectedDate: new Date(selectedDate), 
            cycleDays: cycleDays,
        });
        await newCycle.save();
        res.status(200).json({ message: 'Data stored' }); 
    } catch (error) {
        console.error('Error storing data:', error);
        res.status(500).json({ error: 'Failed to store data' });
    }
});
Routes.post('/get-data', controllerData.getData);
Routes.post('/check-data', controllerData.checkData);
Routes.post('/user-data', controllerData.userData);
Routes.get('/getuser-data/:username', controllerData.getuserData); 

const exerciseController = require("../controller/ExerciseControllers");
Routes.post("/saveSelectedExercises", exerciseController.saveSelectedExercises);

const meditationController = require("../controller/MeditationController");
Routes.post("/saveSelectedMeditations", meditationController.saveSelectedMeditations);

const yogaController = require("../controller/yogaController");
Routes.post("/saveSelectedYogas", yogaController.saveSelectedYogas);

Routes.get("/getSelectedExercises/:username", exerciseController.getSelectedExercises);

module.exports = Routes;
