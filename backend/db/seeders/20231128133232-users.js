'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");
let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   await User.bulkCreate([
    {
      firstName: 'Demo',
      lastName: 'User',
      username: 'Demo',
      hashedPassword: bcrypt.hashSync('password'),
      email: 'DemoUser@user.io',
   },
   {
    firstName: 'Two' ,
    lastName: 'Owt',
    username: 'towowt',
    hashedPassword: bcrypt.hashSync('password2'),
    email: 'towot@user.io',
  },
  {
    firstName: 'Three',
    lastName: 'Eerth',
    username: 'ThreeEerth',
    hashedPassword: bcrypt.hashSync('password3'),
    email: 'ThreeEerth@user.io',
  },
  {
    firstName: "Four",
    lastName: 'Rouf',
    username: 'Fourrouf',
    hashedPassword: bcrypt.hashSync('password4'),
    email: 'Fourrouf@user.io',
  },
  {
    firstName: 'Five',
    lastName: 'Evif',
    username: 'Fiveevif',
    hashedPassword: bcrypt.hashSync('password5'),
    email: 'Fiveevif@user.io',
  }
  ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users'
    await queryInterface.bulkDelete(options, {
      firstName: ['Demo', 'Two', 'Three', 'Four', 'Five']
    })
  }
};
