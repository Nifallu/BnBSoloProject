'use strict';
const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: '2023-11-30',
        endDate:  '2024-1-5'
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2023-12-10',
        endDate: '2023-12-15'
      },
      {
        spotId: 3,
        userId: 4,
        startDate: '2023-12-20',
        endDate: '2023-12-30'
      },
      {
        spotId: 4,
        userId: 5,
        startDate: '2023-12-25',
        endDate: '2023-12-30'
      },
      {
        spotId: 5,
        userId: 1,
        startDate: '2023-12-25',
        endDate: '2024-1-3'
      },

    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings'
    await queryInterface.bulkDelete(options,{
      spotId: [1,2,3,4,5]
    })
  }
};
