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
    duration: {
        type: String,
        default: '6 months'
    },
    expired: {
        type: Boolean,
        default: false
    },
    applicants: [],
}, {timestamps: true})


jobDescriptionSchema.methods = {
}

module.exports = JobDescription = mongoose.model('JobDescription', jobDescriptionSchema)