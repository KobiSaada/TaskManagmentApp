// src/app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const taskRoutes = require('./routes/taskRoutes');
//const notFound = require('./middleware/notFound');
//const errorHandler = require('./middleware/errorHandler'); // אם יש

const app = express();

// לוגים + CORS
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:5173' })); // שנה לפי ה־frontend שלך

// *** קריטי: פרסור של JSON לפני הראוטים ***
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', taskRoutes);

//app.use(notFound);
//if (errorHandler) app.use(errorHandler);

module.exports = app;
