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
---------------------------------------------------------- */
// index: display all listings
router.get('/', function (req, res) {
    db.Listing.find()
        .then(listings => res.json(listings))
})

// index: display specific listing
router.get('/:listingId', function (req, res) {
    db.Listing.findById(req.params.listingId)
        .then(listing => res.json(listing))
})

// create: create new listing
router.post('/', authMiddleware, (req, res) => {
    // const reformat = {
    //     listingId: req.body.listingId,
    //     status: req.body.status,
    //     terms: {
    //         offerPrice: req.body.offerPrice,
    //         expiration: req.body.expiration,
    //         EMD: req.body.EMD,
    //         downPayment: req.body.downPayment,
    //         loanType: req.body.loanType, 
    //         loanAmount: req.body.loanAmount,
    //         appraisalContingencyDate: req.body.appraisalContingencyDate,
    //         loanContingencyDate: req.body.loanContingencyDate,
    //         personalPropertyIncluded: req.body.personalPropertyIncluded,
    //         escrowCompany: req.body.escrowCompany,
    //         walkthrough: req.body.walkthrough,
    //         closeOfEscrow: req.body.closeOfEscrow,
    //         additionalTerms: req.body.additionalTerms,
    //     }
    // }
    db.Listing.create({
        // ...reformat,
        ...req.body,
        userId: req.user.id
    })
        .then(listing => res.json(listing))
})

// update: edit listing
router.put('/:listingId', authMiddleware, async (req, res) => {
    // const reformat = {
    //     listingId: req.body.listingId,
    //     status: req.body.status,
    //     terms: {
    //         offerPrice: req.body.offerPrice,
    //         expiration: req.body.expiration,
    //         EMD: req.body.EMD,
    //         downPayment: req.body.downPayment,
    //         loanType: req.body.loanType, 
    //         loanAmount: req.body.loanAmount,
    //         appraisalContingencyDate: req.body.appraisalContingencyDate,
    //         loanContingencyDate: req.body.loanContingencyDate,
    //         personalPropertyIncluded: req.body.personalPropertyIncluded,
    //         escrowCompany: req.body.escrowCompany,
    //         walkthrough: req.body.walkthrough,
    //         closeOfEscrow: req.body.closeOfEscrow,
    //         additionalTerms: req.body.additionalTerms,
    //     }
    // }
    const userListing = await db.Listing.findById(req.params.listingId)
    if (userListing.userId == req.user.id) {
        const newListing = await db.Listing.findByIdAndUpdate(
            req.params.listingId,
            // reformat,
            req.body,
            { new: true }
        )
        res.json(newListing)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

// destroy: delete listing
router.delete('/:listingId', authMiddleware, async (req, res) => {
    const userListing = await db.Listing.findById(req.params.listingId)
    if (userListing.userId == req.user.id) {
        const deletedListing = await db.Listing.findByIdAndDelete(req.params.listingId)
        res.send('You deleted listing ' + deletedListing._id)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

/* export to server.js
---------------------------------------------------------- */
module.exports = router