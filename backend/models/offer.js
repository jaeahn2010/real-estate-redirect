const mongoose = require('mongoose');

// const termSchema = new mongoose.Schema(
//     {
//         inspection: {
//              company: {type: String}
//              category: {type: String}
//              contingencyDate: {type: Date}             
//         }
//         closingFees: [{
//                 category: {type: String, required: true},
//                 paidBy: {type: String, required: true}
//             }],
//         homeWarranty: {
//              company: {type: String, required: true},
//              plan: {type: String, required: true},
//              amount: {type: String, required: true},
//              paidBy: {type: String, required: true},
//         },
//     }
// )

const offerSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        listingId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Listing' },
        status: { type: String, maxLength: 20, default: "pending" },
        terms: {
            offerPrice: {type: Number, required: true},
            expiration: {type: Date, required: true},
            EMD: {type: Number, required: true},
            downPayment: {type: Number, required: true},
            loanType: {type: String, required: true},
            loanAmount: {type: Number, required: true},
            proofOfFunds: {type: Boolean, required: true},
            appraisalContingencyDate: {type: Date},
            loanContingencyDate: {type: Date},
            personalPropertyIncluded: {type: String, required: true},
            escrowCompany: {type: String, required: true},
            walkthrough: {type: Date, required: true},
            closeOfEscrow: {type: Date, required: true},
            additionalTerms: {type: String},
        }
    },
    { timestamps: true }
);
 
// export to models/index.js
module.exports = mongoose.model('Offer', offerSchema)