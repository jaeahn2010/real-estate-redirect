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
router.get('/:listingId', function (req, res) { //not working b/c localhost 5173 instead of 3000, need to fix
    console.log(req)
    db.Offer.find({ listingId: req.params.listingId })
        .then(offers => res.json(offers))
})

// create: create new offer
router.post('/', (req, res) => {
    db.Offer.create(req.body)
        .then(offer => res.json(offer))
})

// update: edit offer
router.put('/:offerId', (req, res) => {
    db.Offer.findByIdAndUpdate(
        req.params.offerId,
        req.body,
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
