const fs = require('fs');
const join = require('path').join;
const log = require('./util/log');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
const morgan = require('morgan')
const config = require('./config');
const routes = join(__dirname, 'api/routes');

// Server Setup
const port = process.env.PORT || 3090;
const env = process.env.NODE_ENV || 'dev';

// App Setup
const app = express();

// connect to mongodb
config.connect(env);

// Setup middleware
app.use(cors()); // cross domain calls
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

// Fixes 304 response issue
router.use(function timeLog(req, res, next) {
  if (process.env.NODE_ENV) {
    req.headers['if-none-match'] = 'no-match-for-this';
  }
  next();
});

// Bootstrap routes
fs.readdirSync(routes)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(routes, file))(router));

// all of our routes will be prefixed with /api/v1
app.use('/api/v1', router);

app.listen(port);
log.info('Server listening on: http://127.0.0.1:' + port);
