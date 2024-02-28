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
// const buyersCtrl = require('./controllers/buyers')
// const sellersCtrl = require('./controllers/sellers')
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

/* mount routes
---------------------------------------------------------- */
// look at controllers folders for certain urls
app.use('/api/offers', offersCtrl)
app.use('/api/showingRequests', showingRequestsCtrl)
// app.use('/api/buyers', buyersCtrl)
// app.use('/api/sellers', sellersCtrl)
// app.use('/api/favorites', favoritesCtrl)

/* listen to port
---------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});