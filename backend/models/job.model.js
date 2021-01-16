const mongoose = require("mongoose")

// job Description Schema
const jobDescriptionSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    maxApplications:{
        type: Number
    },
    maxOpenings:{
        type: Number
    },
    description:{
        type: String
    },
    skills: [{
        type: String,
        trim: true,
        lowercase: true
    }],

    expired: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})


jobDescriptionSchema.methods = {
}

module.exports = Jobs = mongoose.model('Job', jobDescriptionSchema)