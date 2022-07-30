require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const path = require('path');
const PORT = process.env.PORT;
const app = express();

global.rootPath = path.dirname(require.main.filename);

mongoose.connect(process.env.DB_CONN)
    .catch(error => console.log(error));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/frontend/build/'));
}
app.use(cors())
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});