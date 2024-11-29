const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'sumit.chaurasia187@gmail.com',  
    pass: 'sumit.chaurasia',  
  },
});


const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: 'sumit.chaurasia@yendigital.com',  
      to,
      subject,
      text,
    };

    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
