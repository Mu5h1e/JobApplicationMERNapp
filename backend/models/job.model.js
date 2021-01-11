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
    }
}, {timestamps: true})

// userSchema.methods = {
//     makeSalt: function() {
//         return Math.round(new Date().valueOf() * Math.random())+'' //conv to string
//     },
//     encryptPassword: function(password) {
//         if(!password) return ''
//         try {
//             return crypto
//             .createHmac('sha1', this.salt)
//             .update(password)
//             .digest("hex")
//         } catch(err){
//             return ''
//         }
//     },
//     authenticate: function(plainPassword) {
//         return this.encryptPassword(plainPassword) === this.hashedPassword
//     }
// }

module.exports = Jobs = mongoose.model('User, jobDescriptionSchema')