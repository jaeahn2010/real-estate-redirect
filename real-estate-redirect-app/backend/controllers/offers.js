/* 
-------------------------------------------------------------
`localhost:3000/api/offers`
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
// index: display all offers
router.get('/:listingId', function (req, res) {
    db.Offer.find({ listingId: req.params.listingId })
        .then(offers => res.json(offers))
})

// create: create new offer
router.post('/', authMiddleware, (req, res) => {
    console.log(req.body)
    const reformat = {
        listingId: req.body.listingId,
        status: req.body.status,
        terms: {
            offerPrice: req.body.offerPrice,
            EMD: req.body.EMD,
            downPayment: req.body.downPayment,
            loanType: req.body.loanType, 
            loanAmount: req.body.loanAmount
        }
    }
    db.Offer.create({
        ...reformat,
        userId: req.user.id
    })
        .then(offer => res.json(offer))
})

// update: edit offer
router.put('/:offerId', authMiddleware, async (req, res) => {
    const reformat = {
        listingId: req.body.listingId,
        status: req.body.status,
        terms: {
            offerPrice: req.body.offerPrice,
            EMD: req.body.EMD,
            downPayment: req.body.downPayment,
            loanType: req.body.loanType, 
            loanAmount: req.body.loanAmount
        }
    }
    // Check if the user who sent the update request is the same user who created the comment
    const userOffer = await db.Offer.findById(req.params.offerId)
    if (userOffer.userId == req.user.id) {
        // If it is the original author, update the offer
        const newOffer = await db.Offer.findByIdAndUpdate(
            req.params.offerId,
            reformat,
            { new: true }
        )
        res.json(newOffer)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

// destroy: delete offer
router.delete('/:offerId', authMiddleware, async (req, res) => {
    // Check if the user who sent the delete request is the same user who created the comment
    const userOffer = await db.Offer.findById(req.params.offerId)
    if (userOffer.userId == req.user.id) {
        const deletedOffer = await db.Offer.findByIdAndDelete(req.params.offerId)
        res.send('You deleted comment ' + deletedOffer._id)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

/* export to server.js
---------------------------------------------------------- */
module.exports = router