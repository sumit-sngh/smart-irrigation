const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Simulate IoT sensor data
app.get('/api/sensor-data', (req, res) => {
    // Random simulated values
    const data = {
        soilMoisture: (Math.random() * 100).toFixed(1),
        temperature: (20 + Math.random() * 15).toFixed(1),
        humidity: (30 + Math.random() * 50).toFixed(1),
        pumpStatus: Math.random() > 0.5 ? 'ON' : 'OFF'
    };
    res.json(data);
});

// Handle contact form (simulated)
// You can configure 'your.email@example.com' with your real email
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    // For demo: Log to console and send success
    console.log("Contact Form Submission:", { name, email, message });
    // Uncomment to send real emails with configured transporter
    /*
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your.email@example.com',
            pass: 'yourpassword'
        }
    });
    await transporter.sendMail({
        from: email,
        to: 'your.email@example.com',
        subject: `Contact Form: ${name}`,
        text: message
    });
    */
    res.json({ success: true, message: "Thank you for contacting us!" });
});

// Fallback to index.html for unknown routes (SPA style)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});