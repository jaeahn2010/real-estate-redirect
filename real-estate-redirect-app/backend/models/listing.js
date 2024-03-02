const mongoose = require('mongoose');
const assert = require('assert')

const listingSchema = new mongoose.Schema(
    {
        identifier: {
            apn: {type: String, required: true}
        },
        location: {
            address: {type: String, required: true},
            city: {type: String, required: true},
            state: {type: String, maxLength: 2, required: true},
            zip: {type: Number, maxLength: 5, required: true},
            subdivision: {type: String}
        },
        currentActivity: {
            price: {type: Number, required: true},
            pricePerSF: {type: Number, required: true},
            listDate: {type: Date, required: true, default: new Date()},
            status: {type: String, required: true, default: "active"},
        },
        homeowner: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}],
        generalInfo: {
            propertyType: {type: String, required: true},
            zoning: {type: String, required: true},
            stories: {type: Number, required: true},
            level: {type: Number, required: true},
            yearBuilt: {type: Number, required: true},
            isDetached: {type: Boolean, required: true},
            houseFaces: {type: String, required: true},
        },
        exterior: {
            construction: {
                roof: {type: String, required: true},
                walls: {type: String, required: true},
                fencing: {type: String, required: true},
            }, 
            lot: {
                size: {type: Number, required: true},
                features: [{type: String, required: true},],
                vegetation: [{type: String, required: true},]
            },
            hasSolar: {type: Boolean, required: true},
            hasBalcony: {type: Boolean, required: true},
            hasPool: {type: Boolean, required: true},
            hasSpa: {type: Boolean, required: true},
        },
        interior: {
            construction: {
                flooring: [{type: String, required: true},],
            },
            rooms: {
                bedrooms: {type: Number, required: true},
                bathrooms: {type: Number, required: true},
                bathsFull: {type: Number, required: true},
                roomsTotal: {type: Number, required: true},
            },
            livingArea: {type: Number, required: true},
            cooling: {type: String, required: true},
            heating: {type: String, required: true},
            appliancesIncluded: [{type: String, required: true},],
            features: {
                fixtures: [{type: String, required: true},],
                window: [{type: String, required: true},],
                fireplace: {type: String, required: true},
                other: {type: String, required: true},
            }
        },
        parking: {
            type: {type: String, required: true},
            size: {type: Number, required: true},
        },
        utilities: {
            sewer: {type: String, required: true},
            water: {type: String, required: true},
            otherUtilities: {type: String, required: true},
        },
        HOA: [
                {
                name: {type: String, required: true},
                monthlyFee: {type: Number, required: true},
                phone: {type: String, required: true},
                feeIncludes: [{type: String, required: true},]
                }
            ],
        community: {
            amenities: [{type: String, required: true},],
            isSeniorCommunity: {type: Boolean, required: true},
        },
        lastSoldInfo: {
            soldDate: {type: Date, required: true},
            price: {type: Number, required: true},
            pricePerSF: {type: Number, required: true},
        },
        tax: {
            annualTax: {type: Number, required: true},
            year: {type: Number, required: true},
        }
    },
    { timestamps: true }
);
 
// export to models/index.js
module.exports = mongoose.model('Listing', listingSchema)