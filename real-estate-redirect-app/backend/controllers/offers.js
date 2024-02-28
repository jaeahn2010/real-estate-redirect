/* 
-------------------------------------------------------------
`localhost:3000/api/offers`
------------------------------------------------------------- */

/* modules
---------------------------------------------------------- */
const express = require('express')
const router = express.Router()

/* db connections & models
---------------------------------------------------------- */
const db = require('../models')

/* routes
---------------------------------------------------------- */
// index: display all offers
router.get('/:listingId', function (req, res) {
    db.Offer.find({ listingId: req.params.listingId })
        .then(offers => res.json(offers))
})

// create: create new offer
router.post('/', (req, res) => {
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
    db.Offer.create(reformat)
        .then(offer => res.json(offer))
})

// update: edit offer
router.put('/:offerId', (req, res) => {
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
    db.Offer.findByIdAndUpdate(
        req.params.offerId,
        reformat,
        { new: true }
    )
        .then(offer => res.json(offer))
})

// destroy: delete offer
router.delete('/:offerId', (req, res) => {
    db.Offer.findByIdAndDelete(req.params.offerId)
        .then(() => res.json({ deletedOfferId: req.params.offerId }))
})

/* export to server.js
---------------------------------------------------------- */
module.exports = router