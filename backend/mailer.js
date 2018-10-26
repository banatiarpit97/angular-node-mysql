var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arpitbanati97@gmail.com',
    pass: 'laptoplaptop'
  }
});

module.exports = transporter;