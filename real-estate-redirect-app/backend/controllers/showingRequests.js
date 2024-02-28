/* 
-------------------------------------------------------------
`localhost:3000/api/showingRequests`
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
