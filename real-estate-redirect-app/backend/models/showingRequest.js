const mongoose = require('mongoose');

const showingRequestSchema = new mongoose.Schema(
    {
        // buyerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Buyer' },
        listingId: { type: Number, required: true },
        status: { type: String, maxLength: 20 },
        requestedDateTime: {type: Date, required: true},
    },
    { timestamps: true }
);
 
// export to models/index.js
module.exports = mongoose.model('ShowingRequest', showingRequestSchema);