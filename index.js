const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');
const routes = require('./routes');
const path = require('path');
const PORT = config.get('port');
global.rootPath = path.dirname(require.main.filename);

mongoose.connect(config.get('db.mongodb.host'))
    .catch(error => console.log(error));

const app = express();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/frontend/build/'));
}
app.use(cors())
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//console.log(process.env.NODE_ENV);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});