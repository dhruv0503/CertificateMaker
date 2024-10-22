if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const expressError = require('./utils/expressError')

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const certificateRoutes = require("./routes/certificateRoutes")

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected!'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/api', authRoutes)
app.use('/api/users', userRoutes)
app.use("/api/certificates", certificateRoutes)

app.all('*', (req, res, next) => {
    next(new expressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Internal Server Error';
    res.status(statusCode).json({
        error: {
            message: err.message,
            status: err.statusCode
        }
    });
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
}); 