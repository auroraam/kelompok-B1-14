const mongoose = require('mongoose');
const User = require('./User_m');

const settingsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    themeMode: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light'
    },
    notificationPreference: {
        type: String,
        enum: ['on', 'off'],
        default: 'on'
    }
});

module.exports = mongoose.model('Settings', settingsSchema);