var express = require('express');
var router = express.Router();


// Define routes.
router.get('/',
    function(req, res) {
        res.render('index', { user: req.user });
    });

router.get('/game',
    function(req, res) {
        res.render('game', { user: req.user });
    });

module.exports = router;