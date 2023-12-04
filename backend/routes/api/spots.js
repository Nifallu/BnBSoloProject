const express = require('express')
const { Sequelize} = require('sequelize');

const { Spot, Review, SpotImage, User, ReviewImage, Booking, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');
const { route } = require('./session');


const router = express.Router();


const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .isFloat({ min: -90, max: 90 })
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .isFloat({ min: -180, max: 180 })
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({max: 50})
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .isNumeric()
      .withMessage('Price per day is required'),

    handleValidationErrors
];
//Get all Spots owned by the current user
router.get('/current', requireAuth, async (req, res)=>{
    const userSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    })
    const Spots = [];
    for(let i = 0; i < userSpots.length; i++ ){
        const spot = userSpots[i];
        const previewImage = await SpotImage.findAll({
            where: {
                spotId: spot.id,
                preview: true
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

        let previewImg = false;
        if(previewImage.length) previewImg = true;
        const spotsData = {
            id: spot.id, 
            ownerId: spot.ownerId, 
            address: spot.address, 
            city: spot.city,
            state: spot.state, 
            country: spot.country, 
            lat: parseFloat(spot.lat), 
            lng: parseFloat(spot.lng), 
            name: spot.name, 
            description: spot.description, 
            price: parseFloat(spot.price),
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt, 
            previewImage: previewImg ? previewImage.map(image => image.url).join(', '): 'No Preview Image found',
            avgRating: avgRating
        };
        Spots.push(spotsData)
    }
        return res.json({Spots})
})

//add an Image to a Spot based on the spots id
router.post('/:spotId/images', requireAuth, async (req, res)=> {
    const spot = await Spot.findByPk(req.params.spotId)

    if(spot===null){
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    }

    if(spot.ownerId !== req.user.id){
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    const {url, preview} = req.body
    const newSpotImage = SpotImage.build({
        spotId: parseInt(req.params.spotId),
        url,
        preview
    })

    await newSpotImage.save()

    res.json({       
        id: newSpotImage.id,
        url: newSpotImage.url,
        preview: newSpotImage.preview
    })
})

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res)=>{

    const spot = await Spot.findByPk(req.params.spotId)

    if(spot===null){
        const error = new Error("Spot couldn't be found")
        return res.status(404).json({
            message: error.message,
        });
    }
    
    const reviews = await Review.findAll({
        where:{
        spotId: req.params.spotId
        },
        include:[ {
            model: User,
            attributes: ['id', 'firstName', 'lastName'],
        },
        {    
            model: ReviewImage,
            attributes: ['url']
        } 
        ]       
    })
    res.json({
        reviews
    })
})

//Create a Review for a Spot based on the Spot's id
const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({min:1, max:5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res)=>{
    const spot = await Spot.findByPk(req.params.spotId)

    if(spot===null){
       return res.status(404).json({
            message: "Spot couldn't be found"
        });
    }

    const reviews = await Review.findAll({
        where:{
        userId: req.user.id,
        spotId: req.params.spotId
        }
    }) 
    if(reviews.length >= 1 ){
        return res.status(500).json({
            message: "User already has a review for this spot"
        });
    }
    const {review, stars} = req.body
    const newReview = Review.build({
        userId: req.user.id,
        spotId: parseInt(req.params.spotId),
        review,
        stars
    })
    await newReview.save()

    res.json(newReview)
})

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res)=>{
    const spot = await Spot.findByPk(req.params.spotId)
    
    if(spot===null){
        const error = new Error("Spot couldn't be found")
        return res.status(404).json({
            message: error.message,
        });
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
    })

    let booking;

    if(spot.ownerId == req.user.id){
        booking = bookings.map(booking => ({
        User: {
            id: booking.User.id,
            firstName: booking.User.firstName,
            lastName: booking.User.lastName
        },
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
        }))
    } else {
        booking = bookings.map(booking =>({
            spotId: booking.spotId,
            startDate: booking.startDate,
            endDate: booking.endDate
        }))
    }

    res.json({
        Bookings: booking,
    })
    
})

//Create a Booking from a Spot based on the Spot's id
const validateBooking = [
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage('startDate is required'),
    check('endDate')
        .exists({ checkFalsy: true })
        .custom((endDate, { req }) => {
            const startDate = req.body.startDate; 
            if (endDate <= startDate) {
                throw new Error('endDate cannot be on or before startDate');
            }
            return true;
        }),
    handleValidationErrors
];
router.post('/:spotId/bookings', requireAuth, validateBooking, async (req, res)=> {
    const {startDate, endDate} = req.body
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)

    if(spot===null){
        const error = new Error("Spot couldn't be found")
        return res.status(404).json({
            message: error.message,
        });
    }

    if(spot.ownerId == req.user.id){
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    let newBooking;
    console.log("start and end dates:", startDate, endDate)
    const checkStartDate = await Booking.findOne({
        where:{
            spotId,
            [Sequelize.Op.or]:{
                startDate: startDate,
                endDate: startDate,
                [Sequelize.Op.and]: [
                    {
                        startDate: {
                            [Sequelize.Op.lte]: startDate,
                        },
                        endDate: {
                            [Sequelize.Op.gte]: startDate,
                        },
                    }   
                ]
            }
        }
    })
    console.log("checkStartDate:",checkStartDate)
    const checkEndDate = await Booking.findOne({
        where:{
            spotId,
            [Sequelize.Op.or]:{
                startDate: endDate,
                endDate: endDate,
                [Sequelize.Op.and]: [
                    {
                        startDate: {
                            [Sequelize.Op.lte]: endDate,
                        },
                        endDate: {
                            [Sequelize.Op.gte]: endDate,
                        },
                    } 
                ]
            }
        }
    })
    console.log('check end Dates:',checkEndDate)
    const checkBetween = await Booking.findOne({
        where:{
            [Sequelize.Op.or]: [
                {
                    [Sequelize.Op.and]: [
                        { startDate: { [Sequelize.Op.lte]: startDate } },
                        { endDate: { [Sequelize.Op.gte]: endDate } },
                    ],
                },
                {
                    startDate: {
                        [Sequelize.Op.between]: [startDate, endDate]
                    }
                },
                {
                    endDate: {
                        [Sequelize.Op.between]: [startDate, endDate]
                    }
                }
            ]
        }
    })
    console.log('check between dates:',checkBetween)
    if(checkStartDate === null && checkEndDate === null && checkBetween === null){
        newBooking= Booking.build({
            userId: req.user.id,
            spotId: parseInt(spotId),
            startDate: startDate,
            endDate: endDate
        })
        await newBooking.save()

    }else {
        if(checkStartDate){
            return res.status(403).json({
                message: 'Sorry, this spot is already booked for the specified dates',
                errors: {
                    "startDate": "Start date conflicts with an existing booking"
                }
        })
        }

        if(checkEndDate){
            return res.status(403).json({
                message: 'Sorry, this spot is already booked for the specified dates',
                errors: {
                    "endDate": "End date conflicts with an existing booking"
                }
            })
        }
        return res.status(403).json({
            message: 'Sorry, this spot is already booked for the specified dates',
        })
        }

    res.json(newBooking)
})

//Get details for a Spot from an id
router.get('/:spotId', async(req, res) =>{
    const spot = await Spot.findByPk(req.params.spotId)

    if(spot===null){
        const error = new Error("Spot couldn't be found")
        return res.status(404).json({
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
            spotId: spot.id,
            preview: true
        },
        attributes: ['id', 'url', 'preview']
    })
    const Owner = await User.findOne({
        where: {
            id: spot.ownerId
        },
        attributes: ['id', 'firstName', 'lastName']
    })
    let checkPreviewImg = false;
    if(SpotImage.length) checkPreviewImg = true;
    res.json({
        spot,
        numReviews,
        avgRating,
        SpotImages: checkPreviewImg ? SpotImages: "No Preview Image found",
        Owner

    })
} )

//edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res)=>{
    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    const spot = await Spot.findByPk(req.params.spotId)

    if(spot===null){
        const error = new Error("Spot couldn't be found")
        return res.status(404).json({
            message: error.message,
        });
    }

    if(spot.ownerId !== req.user.id){
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    if(address) spot.address = address;
    if(city) spot.city = city;
    if(state) spot.state = state;
    if(country) spot.country = country;
    if(lat) spot.lat = lat;
    if(lng) spot.lng = lng;
    if(name) spot.name = name;
    if(description) spot.description = description;
    if(price) spot.price = price;

    res.json(spot)
})

//delete a spot
router.delete('/:spotId', requireAuth, async (req, res)=>{

    const spot = await Spot.findByPk(req.params.spotId)

    if(spot===null){
        const error = new Error("Spot couldn't be found")
        return res.status(404).json({
            message: error.message,
        });
    }

    if(spot.ownerId !== req.user.id){
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    await spot.destroy();
    
    res.json({
        message: "Successfully deleted"
    })
})

//query filter
const validateQueryFilters = [
    check('page')
        .optional({ nullable: true })
        .isInt({ min: 1, max: 10 })
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .optional({ nullable: true })
        .isInt({min: 1})
        .withMessage('Size must be greater than or equal to 1'),
    check('maxLat')
        .optional({ nullable: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage('Maximum latitude is invalid'),
    check('minLat')
        .optional({ nullable: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage('Minimum latitude is invalid'),
    check('minLng')
        .optional({ nullable: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage('Maximum longitude is invalid'),
    check('maxLng')
        .optional({ nullable: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage('Minimum longitude is invalid'),
    check('minPrice')
        .optional({ nullable: true })
        .isFloat({min: 0})
        .withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice')
        .optional({ nullable: true })
        .isFloat({min: 0})
        .withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationErrors
];
//get all Spots
router.get('/', validateQueryFilters, async (req, res) => {
    let {page, size, minLat, maxLat,minLng, maxLng, minPrice, maxPrice} = req.query;

    if (page === undefined) page = 1;
    if (size === undefined) size = 10;
    const pagination = {
        limit: size,
        offset: size * (page - 1)
    };
    let parameters = {}

    if(minLat && maxLat){
        parameters.lat = {[Sequelize.Op.between]: [minLat, maxLat]} 
    } else if(minLat){
        parameters.lat = {[Sequelize.Op.gte]: minLat };
    }else if (maxLat) {
        parameters.Lat = {[Sequelize.Op.lte]: maxLat};
    }

    if(minLng && maxLng){
        parameters.lng = {[Sequelize.Op.between]: [minLng, maxLng]}
    }else if(minLng){
        parameters.Lng = {[Sequelize.Op.gte]: minLng };;
    } else if(maxLng) {
        parameters.Lng = {[Sequelize.Op.lte]: maxLng};;
    }
    if(minPrice && maxPrice){
        parameters.price = {[Sequelize.Op.between]: [minPrice, maxPrice]}
    }else if(minPrice){
        parameters.price = {[Sequelize.Op.gte]: minPrice };;
    }else if(maxPrice){
        parameters.price = {[Sequelize.Op.lte]: maxPrice};;
    } 

console.log(parameters)
    const spots = await Spot.findAll({
        ...pagination,
        where: parameters
    });

    const payload = [];  
    for(let i = 0; i < spots.length; i++ ){
        const spot = spots[i];
        const previewImage = await SpotImage.findAll({
            where: {
                spotId: spot.id,
                preview: true
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

        let hasPreviewImage = false;
        if(previewImage.length) hasPreviewImage = true;

        const spotsData = {
            id: spot.id, 
            ownerId: spot.ownerId, 
            address: spot.address, 
            city: spot.city,
            state: spot.state, 
            country: spot.country, 
            lat: parseFloat(spot.lat), 
            lng: parseFloat(spot.lng), 
            name: spot.name, 
            description: spot.description, 
            price: parseFloat(spot.price),
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt, 
            previewImage: hasPreviewImage ? previewImage.map(image => image.url).join(', '): 'No Preview Image found',
            avgRating: avgRating
        };
        payload.push(spotsData)
    }
        return res.json({
            Spots: payload
        })
})

  //Create a spot
router.post('/', requireAuth, validateSpot,  async (req, res)=>{
    const {address, city, state, country, lat, lng, name, description, price} = req.body
    
    const spotInfo = {}
    spotInfo.ownerId = req.user.id;
        spotInfo.address = address
        spotInfo.city = city
        spotInfo.state = state
        spotInfo.country = country
        spotInfo.lat = lat
        spotInfo.lng = lng
        spotInfo.name = name
        spotInfo.description = description
        spotInfo.price = price
    
    const newSpot = Spot.build(
        spotInfo
    )
    await newSpot.save()

    const response = {
        id: newSpot.id,
        ownerId: newSpot.ownerId,
        address: newSpot.address,
        city: newSpot.city,
        state: newSpot.state,
        country: newSpot.country,
        lat: newSpot.lat,
        lng: newSpot.lng,
        name: newSpot.name,
        description: newSpot.description,
        price: newSpot.price,
        createdAt: newSpot.createdAt,
        updatedAt: newSpot.updatedAt
        
    }
    res.json(response)
})

module.exports = router;
