const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// if bad request send error 404 letting user know it is bad request
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;