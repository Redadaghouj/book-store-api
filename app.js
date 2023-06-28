const express = require('express');
const connectToDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errors');
require('dotenv').config();

// connect to database
connectToDB();

// init app
const app = express();

// apply middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(logger);

// set view
app.set('view engine', 'ejs');

// routes
app.use('/api/books', require('./routes/books'));
app.use('/api/authors', require('./routes/authors'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/password', require('./routes/password'));

// error handler middlewares
app.use(notFound);
app.use(errorHandler);

// running the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
