/* 
-------------------------------------------------------------
`localhost:3000/api/showingRequests`
------------------------------------------------------------- */

/* modules
---------------------------------------------------------- */
const jwt = require('jwt-simple');
const express = require('express')
const router = express.Router()

/* db connections & models
---------------------------------------------------------- */
const db = require('../models')

/* Require the JWT config
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
            next();
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
---------------------------------------------------------- */
// index: display all showing requests
router.get('/:listingId', function (req, res) {
    db.ShowingRequest.find({ listingId: req.params.listingId })
        .then(showingRequests => res.json(showingRequests))
})

// create: create new showing request
router.post('/', (req, res) => {
    db.ShowingRequest.create(req.body)
        .then(showingRequest => res.json(showingRequest))
})

// update: edit showing request
router.put('/:showingRequestId', (req, res) => {
    db.ShowingRequest.findByIdAndUpdate(
        req.params.showingRequestId,
        req.body,
        { new: true }
    )
        .then(showingRequest => res.json(showingRequest))
})

// destroy: delete showing request
router.delete('/:showingRequestId', (req, res) => {
    db.ShowingRequest.findByIdAndDelete(req.params.showingRequestId)
        .then(() => res.json({ deletedShowingRequestId: req.params.showingRequestId }))
})

/* export to server.js
---------------------------------------------------------- */
module.exports = router
