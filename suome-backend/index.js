const winston = require('winston');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
// const path = require('path');
// const https = require('https');
// const fs = require('fs');

app.use(helmet());
app.use(cors());
app.disable('x-powered-by');
require('./startup/passport')(app);
require('./startup/logging')();
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/validation')();
require('./startup/config')();

// console.log(path.resolve(__dirname, './server.crt'));
// const options = {
// 	cert: fs.readFileSync(path.resolve(__dirname, './server.crt')),
// 	key: fs.readFileSync(path.resolve(__dirname, './server.key')),
// 	requestCert: false,
// 	rejectUnauthorized: false
// };

const port = process.env.PORT || 3030;
//const server = https.createServer(options, app).listen(port, () => winston.info(`Listening on port ${port}...`));

const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;
