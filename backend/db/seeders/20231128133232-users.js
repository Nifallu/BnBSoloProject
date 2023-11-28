'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

   await User.bulkCreate([
    {
      firstName: 'One',
      lastName: 'Eno',
      username: 'oneeno',
      hashedPassword: bcrypt.hashSync('password1'),
      email: 'oneeno@user.io',
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

    await queryInterface.bulkDelete('User', {
      firstName: ['One', 'Two', 'Three', 'Four', 'Five']
    })
  }
};
