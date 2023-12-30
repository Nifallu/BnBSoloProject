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
      userId: 3,
      review: 'Amazing view',
      stars: 4
    },
    {
      spotId: 1,
      userId: 3,
      review: 'Seagulls envy my view; I envy my stay!',
      stars: 3
    },
    {
      spotId: 2,
      userId:4 ,
      review: 'WiFi weak, nature strong - I survived!',
      stars: 4
    },
    {
      spotId: 2,
      userId: 5,
      review: 'Hugged a tree, felt the vibes!',
      stars: 5
    },
    {
      spotId: 3,
      userId: 1,
      review: 'not bad',
      stars: 3
    },
    {
      spotId: 4,
      userId: 5,
      review: 'eh kinda sticky',
      stars: 2
    },
    {
      spotId: 5,
      userId: 2,
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
      userId: 3,
      review: 'to many bugs',
      stars: 2
    },
    {
      spotId: 3,
      userId: 2,
      review: 'not bad',
      stars: 3
    },
    {
      spotId: 3,
      userId: 4,
      review: 'Squirrel soap opera from my window!',
      stars: 5
    },
    {
      spotId: 4,
      userId: 2,
      review: 'sweetest place to visit',
      stars: 4
    },
    {
      spotId: 4,
      userId: 5,
      review: 'Pancakes fluffier than my dreams!',
      stars: 4
    },
    {
      spotId: 5,
      userId: 1,
      review: 'once in a lifetime experience',
      stars: 5
    },
    {
      spotId: 5,
      userId: 4,
      review: 'Dared to enter; met shadowy secrets!',
      stars: 4
    },
    {
      spotId: 7,
      userId: 2,
      review: 'Inner peace found; trendy tranquility!',
      stars: 4
    },
    {
      spotId: 9,
      userId: 1,
      review: 'Ghostly giggles added charm; loved it!',
      stars: 3
    },
    {
      spotId: 10,
      userId: 2,
      review: 'Best nap of my life; creek magic!',
      stars: 5
    },
    {
      spotId: 10,
      userId: 3,
      review: 'Rustic charm and creek lullabies!',
      stars: 4
    }
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
      review: ['Rustic charm and creek lullabies!', 
                'Best nap of my life; creek magic!',
                'Ghostly giggles added charm; loved it!',
                'Inner peace found; trendy tranquility!', 
                'Dared to enter; met shadowy secrets!', 
                'Pancakes fluffier than my dreams!', 
                'Squirrel soap opera from my window!', 
                'Hugged a tree, felt the vibes!',
                'WiFi weak, nature strong - I survived!', 
                'Seagulls envy my view; I envy my stay!', 
                'Amazing view', 
                'Beautiful', 
                'not bad', 
                'eh kinda sticky', 
                'will never visit again', 
                'nope', 
                'to many bugs', 
                'sweetest place to visit', 
                'once in a lifetime experience' ]
    })
  }
};
