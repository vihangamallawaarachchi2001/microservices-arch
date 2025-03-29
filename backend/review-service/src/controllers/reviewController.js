const Review = require("../models/reviewModel")
const errorHandler = require("../utils/error")

const createReview = async (req, res, next) => {
    try {
        const { userId, refId, type, count, comment } = req.body

        if (!userId || !refId || !type || !count || !comment) {
            return next(errorHandler(400, 'All fields are required'));
        }

        const newReview = new Review({ 
            userId, 
            refId, 
            type, 
            count, 
            comment 
        });
        
        const savedReview = await newReview.save();

        res.status(201).json(savedReview);
    } catch (error) {
        next(error)
    }
}

const deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.reviewId)

        if (!review) {
            return next(errorHandler(404, 'Review not found'));
        }

        await Review.findByIdAndDelete(req.params.reviewId)
        res.status(200).json('Review has been deleted')

    } catch (error) {
        next(error)
    }
}

const getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find()

        if(reviews.length === 0){
            return next(errorHandler(404, 'No reviews found for this user'))
        }

        res.status(200).json(reviews)
    } catch (error) {
        next(error)
    }
}

const getReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.reviewId)

        if (!review) {
            return next(errorHandler(404, 'Review not found'));
        }

        res.status(200).json(review)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createReview,
    deleteReview,
    getReviews,
    getReview
}