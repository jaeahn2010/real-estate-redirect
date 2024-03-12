const mongoose = require('mongoose');

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
            listDate: {type: Date, default: new Date()},
            listingStatus: {type: String, default: "active"},
            photoFilePath: {type: String}
        },
        homeowner: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}],
        generalInfo: {
            propertyType: {type: String},
            zoning: {type: String, default: "single family"},
            stories: {type: Number},
            level: {type: Number, default: 1},
            yearBuilt: {type: Number},
            isDetached: {type: Boolean, default: true},
            houseFaces: {type: String},
        },
        exterior: {
            construction: {
                roof: {type: String},
                walls: {type: String},
                fencing: {type: String},
            }, 
            lot: {
                size: {type: Number},
                features: [{type: String}],
                vegetation: [{type: String}]
            },
            hasSolar: {type: Boolean, required: true},
            hasBalcony: {type: Boolean, required: true},
            hasPool: {type: Boolean, required: true},
            hasSpa: {type: Boolean, required: true},
        },
        interior: {
            construction: {
                flooring: [{type: String}],
            },
            rooms: {
                bedrooms: {type: Number, required: true},
                bathrooms: {type: Number, required: true},
                bathsFull: {type: Number, required: true},
                roomsTotal: {type: Number, required: true},
            },
            livingArea: {type: Number},
            cooling: {type: String},
            heating: {type: String},
            appliancesIncluded: [{type: String}],
            features: {
                fixtures: [{type: String}],
                window: [{type: String}],
                fireplace: {type: String},
                other: {type: String},
            }
        },
        parking: {
            type: {type: String},
            size: {type: Number},
        },
        utilities: {
            sewer: {type: String, default: "public"},
            water: {type: String, default: "public"},
            otherUtilities: {type: String, default: "underground utilities"},
        },
        HOA: [
                {
                name: {type: String},
                monthlyFee: {type: Number},
                phone: {type: String},
                feeIncludes: [{type: String}]
                }
            ],
        community: {
            amenities: [{type: String}],
            isSeniorCommunity: {type: Boolean, default: false},
        },
        lastSoldInfo: {
            soldDate: {type: Date},
            price: {type: Number},
            pricePerSF: {type: Number},
        },
        tax: {
            annualTax: {type: Number},
            year: {type: Number, default: 2023},
        }
    },
    { timestamps: true }
);
 
// export to models/index.js
module.exports = mongoose.model('Listing', listingSchema)