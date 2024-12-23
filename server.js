const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');


const app = express();
const PORT = 3000;
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins or specify your front-end's URL
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // or 'smtp.gmail.com'
    auth: {
        user: "balajikvirat@gmail.com",
        pass: "mfyp cchd stnv zpal",
    },
});

// API endpoint to send an email
app.post('/send-email', async (req, res) => {
    const { message } = req.body;
    console.log('req=======',req.body);
    console.log('message=======',message);
    
    if (!message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Send email
        await transporter.sendMail({
            from: "balajikvirat@gmail.com",
            to: "udayavisco@gmail.com",
            subject: "Get ready for new Ride",
            text: message,
        });

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
