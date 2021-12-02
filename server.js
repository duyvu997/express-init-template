const express = require('express');
const app = express();
const server = require('http').Server(app);
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./middlewares/error-handler');
const routes = require('./routes')
require('dotenv').config();


const PORT = process.env.PORT || 3000;
const logStream = fs.createWriteStream(path.join(__dirname, 'app.log'), {
  flags: 'a',
});

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(morgan('common', { stream: logStream }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

app.use(routes());
app.use(errorHandler);

server.listen(PORT, function () {
  console.log(`App started on port ${PORT}`);
});
