// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

const spotRouter = require('./spots.js');
const reviewRouter = require('./reviews.js');
const bookingRouter = require('./bookings.js');

const {Spot, SpotImage, Review, ReviewImage} = require('../../db/models');

const { restoreUser, requireAuth } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotRouter);

router.use('/reviews', reviewRouter);

router.use('/bookings', bookingRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

//Delete an Image for a Spot
router.delete('/spot-images/:imageId',requireAuth, async (req, res)=>{
  const image = await SpotImage.findByPk(req.params.imageId)

  if(image === null){
    const error = new Error("Spot Image couldn't be found")
        return res.status(404).json({
            message: error.message,
        });
    }
    
    const spot = await Spot.findByPk(image.spotId)

    if(spot.ownerId !== req.user.id){
      return res.status(403).json({
          message: "Forbidden"
      })
  }

  await image.destroy()
  res.json({
    message: "Successfully deleted"
  })
})

//Delete a Review Image
router.delete('/review-images/:imageId',requireAuth, async (req, res)=>{
  const image = await ReviewImage.findByPk(req.params.imageId)

  if(image === null){
    const error = new Error("Review Image couldn't be found")
        return res.status(404).json({
            message: error.message,
        });
    }
    
    const review = await Review.findByPk(image.reviewId)

    if(review.userId !== req.user.id){
      return res.status(403).json({
          message: "Forbidden"
      })
  }

  await image.destroy()
  res.json({
    message: "Successfully deleted"
  })
})
//  testing routs
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });

// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');

// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });


// // GET /api/restore-user

// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

module.exports = router;
