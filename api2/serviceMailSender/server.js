const express = require('express')
const cors = require('cors');
const logger = require('morgan')

const bodyParser = require('body-parser');
const MailSender = require('./serviceMail/MailSender')
require('dotenv').config();

// var corsOptions = {
//     origin: process.env.URL_FONTEND
// };

const app = express()

// Middlewares 
app.use(logger('dev'))
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());
// app.use(cors(corsOptions))

// Routes
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Author: Vũ Văn Nghĩa 20206205'
    })
})
// My routes
app.post('/CreateNewAccount', MailSender.CreateNewAccount)
app.post('/ResetPassword', MailSender.ResetPassword)
app.post('/PaymentConfirmation', MailSender.PaymentConfirmation)
app.post('/SupportMessage1', MailSender.SupportMessage1)
app.post('/SupportMessage2', MailSender.SupportMessage2)
app.post('/NotificationMessage', MailSender.NotificationMessage)

// Start the server 
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`✅ Server run: http://localhost:${port}/`)
}); 