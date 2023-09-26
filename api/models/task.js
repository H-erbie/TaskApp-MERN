const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'please provide task']
    },
    complete: {
        type: Boolean,
        default: false
    },
},{timestamps: true})

module.exports = mongoose.model('Tasks', taskSchema)