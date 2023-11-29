const express = require('express')
const { Model } = require('sequelize');

const { Spot, Review, SpotImage, User } = require('../../db/models');


const router = express.Router();

//get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    const payload = [];
    for(let i = 0; i < spots.length; i++ ){
        const spot = spots[i];
        const previewImage = await SpotImage.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ['url']
        })
        const count = await Review.count({
            where: {
                spotId: spot.id
            }
        })
        const sum = await Review.sum('stars', {
            where: {
                spotId: spot.id
            }
        })
        const avgRating = sum/count;

        const spotsData = {
            id: spot.id, 
            ownerId: spot.ownerId, 
            address: spot.address, 
            city: spot.city,
            state: spot.state, 
            country: spot.country, 
            lat: spot.lat, 
            lng: spot.lng, 
            name: spot.name, 
            description: spot.description, 
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt, 
            previewImage: previewImage,
            avgRating: avgRating
        };
        payload.push(spotsData)
    }
        return res.json({
            payload
        })
})

router.get('/:spotId', async(req, res) =>{
    const spot = await Spot.findByPk(req.params.spotId)

    if(spot===null){
        const error = new Error("Spot couldn't be found")
        res.status(404).json({
            message: error.message,
        });
    }
    const numReviews = await Review.count({
        where:{
            spotId: spot.id
        } 
    })
    const sum = await Review.sum('stars', {
        where: {
            spotId: spot.id
        }
    })
    const avgRating = sum/numReviews;
    
    const SpotImages = await SpotImage.findAll({
        where: {
            spotId: spot.id
        },
        attributes: ['id', 'url', 'preview']
    })
    const Owner = await User.findOne({
        where: {
            id: spot.ownerId
        },
        attributes: ['id', 'firstName', 'lastName']
    })

    res.json({
        spot,
        numReviews,
        avgRating,
        SpotImages,
        Owner

    })
} )



module.exports = router;
