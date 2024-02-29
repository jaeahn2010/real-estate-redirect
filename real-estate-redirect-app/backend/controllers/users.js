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

/* routes
--------------------------------------------------------------- */
// create user (signup route)
router.post('/signup', (req, res) => {
    db.User.create(req.body)
        .then(user => {
            // if the database creates a user successfully, assign a JWT to the user and send the JWT as the response
            const token = jwt.encode({ id: user.id }, config.jwtSecret)
            res.json({ token: token })
        })
        // send an error if the database fails to create a user
        .catch(() => {
            res.status(401)
                .json({ message: 'Could not create a new user. Your email may have been already taken, or your password could be too weak. Try again.' })
        })
})

// login route
router.post('/login', async (req, res) => {
    // attempt to find user w/ email in db
    const foundUser = await db.User.findOne({ email: req.body.email })
    // ensure user exists and pw is correct
    if (foundUser && foundUser.password === req.body.password) {
        // if true, send the JWT to the browser
        const payload = { id: foundUser.id }
        const token = jwt.encode(payload, config.jwtSecret)
        res.json({
            token: token,
            email: foundUser.email
        })
        // if user not found OR pw incorrect, send error
    } else {
        res.status(401)
	    .json({ message: 'Incorrect email or password. Please try again.' })
    }
})

/* export to server.js
--------------------------------------------------------------- */
module.exports = router