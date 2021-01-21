const express = require('express')
const router = express.Router()

const {
    profileDisplayController,
    currentJobListings,
    addJobListing,
    expandedDashboardController,
    addJobApplication
} = require('../controllers/user.controller')

router.post('/user/',profileDisplayController)
router.post('/dashboard/', currentJobListings)
router.post('/addJobListings', addJobListing)
router.post('/expanded-dashboard', expandedDashboardController)
router.post('/add-application', addJobApplication)

module.exports = router