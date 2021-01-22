const mongoose = require('mongoose');
const crypto = require('crypto');
// user schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    hashed_password: {
      type: String,
      required: true
    },
    salt: String,
    role: {
      type: String,
    },
    resetPasswordLink: {
      data: String,
      default: ''
    },
    education: [
        {
            type: String,  
            lowercase: true    
        }
    ],
    skills: [
        {
            type: String,
            trim: true,
            lowercase: true
        }
    ],
    rating: {
      type: Number,
      default: 0,
      
    },
    appliedList: [
        {
            type: String,
        }
    ]
  },
  {
    timestamps: true
  }
);

// virtual
userSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// methods
userSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  }
};

module.exports=Users= mongoose.model('User', userSchema);
