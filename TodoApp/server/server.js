const express = require('express')
const cors = require('cors');
const logger = require('morgan')
require('dotenv').config();

// var corsOptions = {
//     origin: process.env.URL_FONTEND
// };

const app = express()

// Middlewares 
app.use(logger('dev'))
app.use(express.json());
app.use(cors())
// app.use(cors(corsOptions))

// My routes
const jobRoute = require('./routes/job')
app.use('/api/jobs', jobRoute)

// ==============================
// Routes
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Author: Vũ Văn Nghĩa 20206205'
    })
})

// Catch 404 Errors
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// Error handler function
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    return res.status(status).json({
        error: {
            message: error.message
        }
    })
})

// Start the server 
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`✅ Server run: http://localhost:${port}/`))