const mongoose = require('mongoose');

// const termSchema = new mongoose.Schema(
//     {
//         offerPrice: {type: Number, required: true},
// //         expiration: {type: Date, required: true},
// //         listingShown: {type: Boolean, required: true},
// //         EMD: {type: Number, required: true},
// //         downPayment: {type: Number, required: true},
// //         loanType: {type: String, required: true},
// //         loanAmount: {type: Number, required: true},
// //         proofOfFunds: {type: Boolean, required: true},
// //         inspectionType: [{type: String, required: true}],
// //         inspectionDate: [{type: Date, required: true}],
// //         appraisalDate: {type: Date, required: true},
// //         loanContingencyDate: {type: Date, required: true},
// //         personalPropertyIncluded: [{type: String, required: true}],
// //         escrow: {type: String, required: true},
// //         repairRequests: [{type: String, required: true}],
// //         closingFees: [{type: Number, required: true}],
// //         homeWarranty: {type: String, required: true},
// //         walkthrough: {type: Date, required: true},
// //         closeOfEscrow: {type: Date, required: true},
// //         addtionalTerms: {type: String, required: true},
//     }
// )

const offerSchema = new mongoose.Schema(
    {
        // buyerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Buyer' },
        listingId: { type: Number, required: true },
        status: { type: String, maxLength: 20, default: "pending" },
        terms: {
            offerPrice: {type: Number, required: true},
        }
    },
    { timestamps: true }
);
 
// export to models/index.js
module.exports = mongoose.model('Offer', offerSchema)