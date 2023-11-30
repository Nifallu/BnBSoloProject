const express = require('express')
const { Model } = require('sequelize');

const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');
const { route } = require('./session');


const router = express.Router();

//Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res)=>{
    const reviews = await Review.findAll({
        where:{
        userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'id','ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name',
                'price'],
                include: {
                    model: SpotImage,
                    attributes: ['url'],
                    as: 'previewImage',
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    const formattedReviews = reviews.map((review) => ({
        ...review.toJSON(),
        Spot: {
            ...review.Spot.toJSON(),
            previewImage: review.Spot.previewImage.map((image) => image.url).join(', '),
        },
    }));
    

    res.json({
        Reviews: formattedReviews
    })
})

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res)=>{
    const review = await Review.findByPk(req.params.reviewId)
    if(review === null){
        res.status(404).json({
            message: "Review couldn't be found"
        });
    }

    if(review.userId !== req.user.id){
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: review.id
        }
    })
    if(reviewImages.length >= 10){
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        })
    }
    const {url} = req.body
    const newReviewImg = ReviewImage.build({
        reviewId: req.params.reviewId,
        url: url
    });
    await newReviewImg.save();

    res.json({
        id: newReviewImg.id,
        url: newReviewImg.url,
    })
})


module.exports = router;
