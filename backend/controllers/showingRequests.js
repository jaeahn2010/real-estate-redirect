/* 
-------------------------------------------------------------
`localhost:3000/api/showingRequests`
------------------------------------------------------------- */

//require mongoose to access objectId
const mongoose = require('mongoose');

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
    db.ShowingRequest.find({ listingId: new mongoose.Types.ObjectId(req.params.listingId) })
        .then(showingRequests => res.json(showingRequests))
})

// create: create new showing request
router.post('/', authMiddleware, (req, res) => {
    if (req.body.requestedDateTime) {
        db.ShowingRequest.create({
            ...req.body,
            userId: req.user.id
        })
            .then(showingRequest => res.json(showingRequest))
    } else {
        console.log("should get here")
        res.status(400).json({message: "Invalid date/time input. Please try again."})
    }
})

// update: edit showing request
router.put('/:showingRequestId', authMiddleware, async (req, res) => {
    const reformat = {
        ...req.body,
        requestedDateTime: new Date(`${req.body.requestedDate}T${req.body.requestedTime}:00.000Z`)
    }
    const userShowingRequest = await db.ShowingRequest.findById(req.params.showingRequestId)
    const currentUser = await db.User.findById(req.user.id)
    
    if (userShowingRequest.userId == req.user.id || currentUser.category === "seller") {
        const newShowingRequest = await db.ShowingRequest.findByIdAndUpdate(
            req.params.showingRequestId,
            reformat,
            { new: true }
        )
        res.json(newShowingRequest)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

// destroy: delete showing request
router.delete('/:showingRequestId', authMiddleware, async (req, res) => {
    // Check if the user who sent the delete request is the same user who created the showing request
    const userShowingRequest = await db.ShowingRequest.findById(req.params.showingRequestId)
    if (userShowingRequest.userId == req.user.id) {
        const deletedShowingRequest = await db.ShowingRequest.findByIdAndDelete(req.params.showingRequestId)
        res.send('You deleted comment ' + deletedShowingRequest._id)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

/* export to server.js
---------------------------------------------------------- */
module.exports = router