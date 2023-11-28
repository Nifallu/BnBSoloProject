'use strict';

const { Spot, SpotImage } = require('../models');

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
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '123 main ave',
        city: 'OceanView',
        state: 'ME',
        country: 'USA',
        lat: 45.2538,
        lng: 69.4455,
        name: 'Main ave apartment',
        description: 'Apartment overlooking the ocean',
        price: 500
      },
      {
        ownerId: 2,
        address: '456 Burch st',
        city: 'Centennial',
        state: 'WY',
        country: 'USA',
        lat: 41.297981,
        lng: -106.137614,
        name: 'Burchwood Cabins',
        description: 'Mountain Cabins',
        price: 400
      },
      {
        ownerId: 3,
        address: '789 ok drive',
        city: 'Chicago',
        state:'IL' ,
        country: "USA",
        lat: 41.8781,
        lng: 87.6298,
        name: 'Bland Apartments',
        description: 'Apartment overlooking the a park',
        price: 300
      },
      {
        ownerId: 4,
        address: '1011 maple dr',
        city: 'Maple Syrup',
        state: '',
        country: 'Canada',
        lat: 43.8518,
        lng: 79.5273,
        name: 'Syrup Place',
        description: 'A sweet place to sleep',
        price: 299.90
      },
      {
        ownerId: 5,
        address: '123 missing st',
        city: 'Lost',
        state: '',
        country: 'nowhere',
        lat: 25.0000,
        lng: 71.0000,
        name: 'the dark zone',
        description: 'stay at your own risk',
        price: 49.99
      },
    ])

    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://picsum.photos/200',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://picsum.photos/200',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://picsum.photos/200',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://picsum.photos/200',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://picsum.photos/200',
        preview: false,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spot', {
      address: ['123 main ave', '456 Burch st', '789 ok drive', '1011 maple dr', '123 missing st' ]
    })
    await queryInterface.bulkDelete('SpotImage', {
      url: 'https://picsum.photos/200'
    })
  }
};
