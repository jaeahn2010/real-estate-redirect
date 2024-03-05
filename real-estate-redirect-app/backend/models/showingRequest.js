const mongoose = require('mongoose');

const showingRequestSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        listingId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Listing'},
        status: { type: String, maxLength: 20 },
        requestedDateTime: {type: Date, required: true},
    },
    { timestamps: true }
);
 
// export to models/index.js
module.exports = mongoose.model('ShowingRequest', showingRequestSchema);