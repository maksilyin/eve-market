const express = require('express');
const router = express.Router();
const fs = require('fs');

router.use('/api/v1/', require('./api/v1/routes'))
router.use('/*', function (req, res) {
    try {
        res.sendFile(__dirname + '/frontend/build/index.html');
    } catch (e) {
        res.status(500);
    }
});
module.exports = router;