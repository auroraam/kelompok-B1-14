const mongoose = require('mongoose');
const User = require('./User_m');
const Task = require('./Task_m');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task',
        required: true
    },
    notificationTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['sent', 'pending', 'read'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Notification', notificationSchema);