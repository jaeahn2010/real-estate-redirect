/* 
---------------------------------------------------------------------------------------
localhost:3000/api/favorites
---------------------------------------------------------------------------------------
*/

const mongoose = require('mongoose')

/* modules
--------------------------------------------------------------- */
const jwt = require('jwt-simple')
const express = require('express')
const router = express.Router()

/* db connection & models
--------------------------------------------------------------- */
const db = require('../models')

/* JWT config
--------------------------------------------------------------- */
const config = require('../../jwt.config.js')

/* Middleware that checks if a JWT sent from the client is valid.
   Used for all routes that require authorization
--------------------------------------------------------------- */
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decodedToken = jwt.decode(token, config.jwtSecret);
            req.user = decodedToken;
            next();
        } catch (err) {
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
};

/* Routes
--------------------------------------------------------------- */
// index: get all favorited listings
router.get('/', authMiddleware, async (req, res) => {
    const favorites = await db.Favorite.find(
        { userId: req.user.id },
    )
    res.json(favorites)
})

// post: create favorite
router.post('/', authMiddleware, (req, res) => {
    db.Favorite.create({
        listingId: req.body.listingId,
        userId: req.user.id,
    })
        .then(favorite => res.json(favorite))
})

// destroy: delete favorite
router.delete('/:listingId', authMiddleware, async (req, res) => {
    const userFavorite = await db.Favorite.findOne({listingId: req.body.listingId, userId: req.user.id})
    if (userFavorite) {
        const deletedFavorite = await db.Favorite.findOneAndDelete({listingId: req.body.listingId, userId: req.user.id})
        res.send('You deleted favorite ' + deletedFavorite._id)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

/* export to server.js
--------------------------------------------------------------- */
module.exports = router
