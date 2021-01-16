const express = require('express')
const router = express.Router()

const {
    profileDisplayController,
    currentJobListings,
    addJobListing
} = require('../controllers/user.controller')

const {

} = require('../helpers/user.helper')

router.post('/user/',profileDisplayController)
router.post('/dashboard/', currentJobListings)
router.post('/addJobListings', addJobListing)
module.exports = router