const express = require('express')
const { Model } = require('sequelize');

const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { requireAuth } = require('../../utils/auth');
const { route } = require('./session');

const router = express.Router();


//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res)=>{
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'id','ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name',
                'price'],
                include: {
                    model: SpotImage,
                    attributes: ['url'],
                    as: 'previewImage',
                }
            }
        ]
    })
    // Edit the response format // is there an easier way to reorder everything? 
    const transformedBookings = bookings.map(booking => ({
        id: booking.id,
        spotId: booking.spotId,
        Spot: {
          id: booking.Spot.id,
          ownerId: booking.Spot.ownerId,
          address: booking.Spot.address,
          city: booking.Spot.city,
          state: booking.Spot.state,
          country: booking.Spot.country,
          lat: booking.Spot.lat,
          lng: booking.Spot.lng,
          name: booking.Spot.name,
          price: booking.Spot.price,
          previewImage: booking.Spot.previewImage.map(image => image.url).join(', ')
        },
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      }));
  
      res.json({ Bookings: transformedBookings });
})


module.exports = router;
