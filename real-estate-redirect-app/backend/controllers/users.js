/* 
---------------------------------------------------------------------------------------
 `localhost:3000/api/users`
---------------------------------------------------------------------------------------
*/

/* modules
--------------------------------------------------------------- */
const jwt = require('jwt-simple')
const express = require('express')
const router = express.Router()

/* db connection & models
--------------------------------------------------------------- */
const db = require('../models')

/* jwt config
--------------------------------------------------------------- */
const config = require('../../jwt.config.js')

/* Middleware that checks if a JWT sent from the client is valid.
   Used for all routes that require authorization
--------------------------------------------------------------- */
const authMiddleware = (req, res, next) => {
    // Check if the 'Authorization' header is present and has the token
    const token = req.headers.authorization;
    if (token) {
        try {
            // Decode the token using the secret key and add the decoded payload to the request object
            const decodedToken = jwt.decode(token, config.jwtSecret);
            req.user = decodedToken;
            next(); //pass control to next matching route
        } catch (err) {
            // Return an error if the token is invalid
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        // Return an error if the 'Authorization' header is missing or has the wrong format
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
};

/* routes
--------------------------------------------------------------- */
// get current user id - need to find alternative, probably not secure
router.get('/token', authMiddleware, (req, res) => {
    db.User.findById(req.user.id)
        .then(user => {
            res.json({ userId: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, category: user.category })
        })
})

// create user (signup route)
router.post('/signup', (req, res) => {
    db.User.create(req.body)
        .then(user => {
            // if the database creates a user successfully, assign a JWT to the user and send the JWT as the response
            const token = jwt.encode({ id: user.id }, config.jwtSecret)
            res.json({ token: token, firstName: user.firstName, lastName: user.lastName, category: user.category })
        })
        // send an error if the database fails to create a user
        .catch(() => {
            res.status(401)
                .json({ message: 'Could not create a new user. Your email may have been already taken, or your password could be too weak. Try again.' })
        })
})

// login route
router.post('/login', async (req, res) => {
    const foundUser = await db.User.findOne({ email: req.body.email })
    if (foundUser && foundUser.password === req.body.password) {
        // if true, send the JWT to the browser
        const payload = { id: foundUser.id }
        const token = jwt.encode(payload, config.jwtSecret)
        res.json({token: token, firstName: foundUser.firstName, lastName: foundUser.lastName, category: foundUser.category })
        // if user not found OR pw incorrect, send error
    } else {
        res.status(401)
	    .json({ message: 'Incorrect email or password. Please try again.' })
    }
})

// get user
router.get('/:userId', (req, res) => {
    db.User.findById(req.params.userId)
        .then(user => {
            const token = jwt.encode({ id: user.id }, config.jwtSecret)
            res.json({ token: token, firstName: user.firstName, lastName: user.lastName, category: user.category })
        })
})

/* export to server.js
--------------------------------------------------------------- */
module.exports = router