const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

const homeRouter = require('../routes/home');
const chartRouter = require('../routes/chart');
app.use('/', homeRouter);
app.use('/chart', homeRouter);

const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

