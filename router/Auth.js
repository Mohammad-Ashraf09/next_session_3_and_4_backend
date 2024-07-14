const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//REGISTER
router.post('/register', async (req, res) => {
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            password: hashedPassword,
            profilePicture: req.body.profilePicture,
        });

        //save user and respond
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json('user not found');

    const { password, updatedAt, __v, ...other } = user._doc;
    const validPassword = await bcrypt.compare(req.body.password, password);
    if (validPassword) {
        const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h',
        });
        res.json({ accessToken, other }); // here from user only passings keys except 'password', 'updatedAt' and '__v'
    } else {
        res.status(400).json('wrong password');
    }
});

module.exports = router;
