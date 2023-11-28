'use strict';
const { Review, ReviewImage } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await Review.bulkCreate([
    {
      spotId: 1,
      userId: 1,
      review: 'Amazing view',
      stars: 4
    },
    {
      spotId: 2,
      userId:2 ,
      review: 'Beautiful',
      stars: 5
    },
    {
      spotId: 3,
      userId: 3,
      review: 'not bad',
      stars: 3
    },
    {
      spotId: 4,
      userId: 4,
      review: 'eh kinda sticky',
      stars: 2
    },
    {
      spotId: 5,
      userId: 5,
      review: 'will never visit again',
      stars: 1
    },
    {
      spotId: 1,
      userId: 5,
      review: 'nope',
      stars: 1
    },
    {
      spotId: 2,
      userId: 4,
      review: 'to many bugs',
      stars: 2
    },
    {
      spotId: 3,
      userId: 3,
      review: 'not bad',
      stars: 3
    },
    {
      spotId: 4,
      userId: 2,
      review: 'sweetest place to visit',
      stars: 4
    },
    {
      spotId: 5,
      userId: 1,
      review: 'once in a lifetime experience',
      stars: 5
    },
   ], { validate: true })

   await ReviewImage.bulkCreate([
    {
      reviewId: 1,
      url: 'https://picsum.photos/200',
    },
    {
      reviewId: 2,
      url: 'https://picsum.photos/200',
    },
    {
      reviewId: 3,
      url: 'https://picsum.photos/200',
    },
    {
      reviewId: 4,
      url: 'https://picsum.photos/200',
    },
    {
      reviewId: 5,
      url: 'https://picsum.photos/200',
    }
   ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ReviewImages', {
      url: 'https://picsum.photos/200'
    })
    await queryInterface.bulkDelete('Reviews',{
      review: ['Amazing view', 'Beautiful', 'not bad', 'eh kinda sticky', 'will never visit again', 'nope', 'to many bugs', 'sweetest place to visit', 'once in a lifetime experience' ]
    })

  }
  
};
