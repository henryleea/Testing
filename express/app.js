const express  = require('express');
const http     = require('http');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');

const config   = require('./lib/config');
const log      = require('./lib/log');
const text     = require('./lib/text');

const app = express();
const svr = http.createServer(app);


app.use(cors());

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
    res.send('BMW NLP');
});

app.post('/text/semantic', text.semantic);

svr.listen(config.PORT, '0.0.0.0');