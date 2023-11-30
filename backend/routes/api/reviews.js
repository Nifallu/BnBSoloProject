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
                attribute: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                exclude: ['createdAt', 'updatedAt']
            },
            {
                model: ReviewImage,
                attribute: ['id', 'url']
            }
        ]
    })

    res.json({
        Reviews: reviews
    })
})


module.exports = router;
