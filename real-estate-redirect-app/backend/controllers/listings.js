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
    const reformat = {
        identifier: {
            apn: req.body.apn,
        },
        location: {
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            subdivision: req.body.subdivision,
        },
        currentActivity: {
            price: req.body.price,
            pricePerSF: req.body.pricePerSF,
            listDate: req.body.listDate,
            status: req.body.status,
        },
        homeowner: req.body.homeowner,
        generalInfo: {
            propertyType: req.body.propertyType,
            zoning: req.body.zoning,
            stories: req.body.stories,
            level: req.body.level,
            yearBuilt: req.body.yearBuilt,
            isDetached: req.body.isDetached,
            houseFaces: req.body.houseFaces,
        },
        exterior: {
            construction: {
                roof: req.body.roof,
                walls: req.body.walls,
                fencing: req.body.fencing,
            }, 
            lot: {
                size: req.body.lotSize,
                features: req.body.lotFeatures,
                vegetation: req.body.vegetation
            },
            hasSolar: req.body.hasSolar,
            hasBalcony: req.body.hasBalcony,
            hasPool: req.body.hasPool,
            hasSpa: req.body.hasSpa,
        },
        interior: {
            construction: {
                flooring: req.body.flooring,
            },
            rooms: {
                bedrooms: req.body.bedrooms,
                bathrooms: req.body.bathrooms,
                bathsFull: req.body.bathsFull,
                roomsTotal: req.body.roomsTotal,
            },
            livingArea: req.body.livingArea,
            cooling: req.body.cooling,
            heating: req.body.heating,
            appliancesIncluded: req.body.appliancesIncluded,
            features: {
                fixtures: req.body.fixtures,
                window: req.body.window,
                fireplace: req.body.fireplace,
                other: req.body.other,
            }
        },
        parking: {
            type: req.body.parkingType,
            size: req.body.parkingSize,
        },
        utilities: {
            sewer: req.body.sewer,
            water: req.body.water,
            otherUtilities: req.body.otherUtilities
        },
        HOA: [
                {
                name: req.body.HOAName,
                monthlyFee: req.body.HOAMonthlyFee,
                phone: req.body.HOAPhone,
                feeIncludes: req.body.HOAFeeIncludes
                }
            ],
        community: {
            amenities: req.body.communityAmenities,
            isSeniorCommunity: req.body.isSeniorCommunity
        },
        lastSoldInfo: {
            soldDate: req.body.lastSoldDate,
            price: req.body.lastSoldPrice,
            pricePerSF: req.body.lastSoldPricePerSF,
        },
        tax: {
            annualTax: req.body.annualTax,
            year: req.body.lastTaxYear,
        }
    }
    db.Listing.create({
        ...reformat,
        userId: req.user.id
    })
        .then(listing => res.json(listing))
})

// update: edit listing
router.put('/:listingId', authMiddleware, async (req, res) => {
    const reformat = {
        identifier: {
            apn: req.body.apn,
        },
        location: {
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            subdivision: req.body.subdivision,
        },
        currentActivity: {
            price: req.body.price,
            pricePerSF: req.body.pricePerSF,
            listDate: req.body.listDate,
            status: req.body.status,
        },
        homeowner: req.body.homeowner,
        generalInfo: {
            propertyType: req.body.propertyType,
            zoning: req.body.zoning,
            stories: req.body.stories,
            level: req.body.level,
            yearBuilt: req.body.yearBuilt,
            isDetached: req.body.isDetached,
            houseFaces: req.body.houseFaces,
        },
        exterior: {
            construction: {
                roof: req.body.roof,
                walls: req.body.walls,
                fencing: req.body.fencing,
            }, 
            lot: {
                size: req.body.lotSize,
                features: req.body.lotFeatures,
                vegetation: req.body.vegetation
            },
            hasSolar: req.body.hasSolar,
            hasBalcony: req.body.hasBalcony,
            hasPool: req.body.hasPool,
            hasSpa: req.body.hasSpa,
        },
        interior: {
            construction: {
                flooring: req.body.flooring,
            },
            rooms: {
                bedrooms: req.body.bedrooms,
                bathrooms: req.body.bathrooms,
                bathsFull: req.body.bathsFull,
                roomsTotal: req.body.roomsTotal,
            },
            livingArea: req.body.livingArea,
            cooling: req.body.cooling,
            heating: req.body.heating,
            appliancesIncluded: req.body.appliancesIncluded,
            features: {
                fixtures: req.body.fixtures,
                window: req.body.window,
                fireplace: req.body.fireplace,
                other: req.body.other,
            }
        },
        parking: {
            type: req.body.parkingType,
            size: req.body.parkingSize,
        },
        utilities: {
            sewer: req.body.sewer,
            water: req.body.water,
            otherUtilities: req.body.otherUtilities
        },
        HOA: [
                {
                name: req.body.HOAName,
                monthlyFee: req.body.HOAMonthlyFee,
                phone: req.body.HOAPhone,
                feeIncludes: req.body.HOAFeeIncludes
                }
            ],
        community: {
            amenities: req.body.communityAmenities,
            isSeniorCommunity: req.body.isSeniorCommunity
        },
        lastSoldInfo: {
            soldDate: req.body.lastSoldDate,
            price: req.body.lastSoldPrice,
            pricePerSF: req.body.lastSoldPricePerSF,
        },
        tax: {
            annualTax: req.body.annualTax,
            year: req.body.lastTaxYear,
        }
    }
    const userListing = await db.Listing.findById(req.params.listingId)
    if (userListing.homeowner[0] == req.user.id) {
        const newListing = await db.Listing.findByIdAndUpdate(
            req.params.listingId,
            reformat,
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
    if (userListing.homeowner[0] == req.user.id) {
        const deletedListing = await db.Listing.findByIdAndDelete(req.params.listingId)
        res.send('You deleted listing ' + deletedListing._id)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})

/* export to server.js
---------------------------------------------------------- */
module.exports = router