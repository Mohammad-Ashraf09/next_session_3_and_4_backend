const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const authRoute = require('./router/Auth');
const userRoute = require('./router/Users');
const blogRoute = require('./router/Blogs');
const { DATABASE } = require('./config/keys');
const { authenticateToken } = require('./middlewares');

dotenv.config();

mongoose
    .connect(DATABASE)
    .then(() => {
        console.log(`connected to database`);
    })
    .catch((err) => {
        console.log(err);
    });

// middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// routes
app.use('/api/auth', authRoute);
app.use('/api/users', authenticateToken(), userRoute);
app.use('/api/blogs', authenticateToken(), blogRoute);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

app.listen(8000, () => {
    console.log(`server is running at port 8000`);
});
