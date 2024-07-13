import express from 'express';
import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';

const app = express();
const port = 3000;

const mail = asyncHandler(async (req, res) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dungeon0559@gmail.com',
      pass: 'fcrl sttw dwtw ggyh'
    }
  });

  var mailOptions = {
    from: 'dungeon0559@gmail.com',
    to: 'vidhanshah59@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'hey there!!!'
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    } else {
      console.log('Email sent: ' + info.response);
      res.json('Email sent: ' + info.response);
    }
  });
});

// Dummy registerUser handler, replace with actual implementation
const registerUser = asyncHandler(async (req, res) => {
  res.json({ message: 'User registered!' });
});

// Routes
app.post('/register', registerUser);
app.post('/send-email', mail);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { registerUser, mail };
