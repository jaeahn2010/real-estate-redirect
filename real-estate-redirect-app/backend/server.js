/* modules
---------------------------------------------------------- */
require('dotenv').config()
const express = require('express');
const cors = require('cors')
const path = require('path')

/* db connection, models, seed data
---------------------------------------------------------- */
const db = require('./models');

/* routes in controllers folder
--------------------------------------------------------------- */
const offersCtrl = require('./controllers/offers')
const showingRequestsCtrl = require('./controllers/showingRequests')
const usersCtrl = require('./controllers/users')
const listingsCtrl = require('./controllers/listings')
// const favoritesCtrl = require('./controllers/favorites')

/* create express app
---------------------------------------------------------- */
const app = express();

/* middleware
---------------------------------------------------------- */
// cross origin allowance
app.use(cors())
// body parser - used for POST/PUT/PATCH routes:
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// use the React build folder for static files
app.use(express.static(path.join(path.dirname(__dirname), 'frontend', 'dist')))


/* mount routes
---------------------------------------------------------- */
// look at controllers folders for certain urls
app.use('/api/offers', offersCtrl)
app.use('/api/showingRequests', showingRequestsCtrl)
app.use('/api/users', usersCtrl)
app.use('/api/listings', listingsCtrl)
// app.use('/api/favorites', favoritesCtrl)

// seed with mock listings and sellers for testing - do this locally before presentation - localhost:3000/seed
// always seed user first, listings last
// if (process.env.ON_HEROKU === 'false') {
    app.get('/seed', function (req, res) {
        db.User.deleteMany({})
            .then(removedUsers => {
                console.log(`Removed ${removedUsers.deletedCount} users.`)
                db.User.insertMany(db.seedSellers)
                    .then(addedUsers => {
                        console.log(`Added ${addedUsers.length} sellers. Reset to original database.`)
                        res.json(addedUsers)
                })
        })
        db.Listing.deleteMany({})
            .then(removedListings => {
                console.log(`Removed ${removedListings.deletedCount} listings.`)
                db.Listing.insertMany(db.seedListings)
                    .then(addedListings => {
                        console.log(`Added ${addedListings.length} listings. Reset to original database.`)
                        res.json(addedListings)
                    })
            })
        db.Offer.deleteMany({})
            .then(removedOffers => {
                console.log(`Removed ${removedOffers.deletedCount} offers.`)
            })
        db.ShowingRequest.deleteMany({})
            .then(removedShowingRequests => {
                console.log(`Removed ${removedShowingRequests.deletedCount} showing requests.`)
            })            
    });
// }

// Any other route not matching the routes above gets routed by React
app.get('*', (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), 'frontend', 'dist', 'index.html'));
});

/* listen to port
---------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});