const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Listing'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
})

module.exports = mongoose.model('Favorite', favoriteSchema);