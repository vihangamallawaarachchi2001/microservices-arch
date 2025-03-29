const express = require('express')
const { createReview, deleteReview, getReviews, getReview } = require('../controllers/reviewController')

const router = express.Router()

router.post('/create-review', createReview)
router.delete('/delete-review/:reviewId', deleteReview)
router.get('/getAllReviews', getReviews)
router.get('/getReview/:reviewId', getReview)

module.exports = router