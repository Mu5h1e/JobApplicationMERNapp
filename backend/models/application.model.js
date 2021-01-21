const mongoose = require("mongoose")

// job Description Schema
const jobApplicationSchema = new mongoose.Schema({
    applicantId:{
        type: String,
        tril: true,
        required: true
    },
    jobId:{
        type: String,
        tril: true,
        required: true       
    },
    bio:{
        type: String
    },
    skills: [{
        type: String,
        trim: true,
        lowercase: true
    }],
    expired: {
        type: Boolean,
        default: false
    },
    applicants: [],
}, {timestamps: true})


jobApplicationSchema.methods = {
}

module.exports = JobApplications = mongoose.model('JobApplication', jobApplicationSchema)