const mongoose = require('mongoose')

const sch = mongoose.Schema

const workoutSchema = new sch({
    title: {
        type: String,
        required: true
    },

    reps: {
        type: Number,
        required: true
    },

    load: {
        type: Number,
        required: true
    }
}, { timestamps: true })    //timestamps for new/updated documents are saved - useful


//EXPORTING BLUEPRINT OF NEW COLLECTION named - 'workout' (no data in table yet, will be pluralised) and the blueprint variable used to create it
module.exports = mongoose.model('workout', workoutSchema)
