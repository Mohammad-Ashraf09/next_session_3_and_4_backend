const User = require('../model/User');
const router = require('express').Router();

//get all users
router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
