'use strict';

const { Spot, SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
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
        description: "Feel the waves greet you every morning at Main Ave Apartment – where your coffee comes with a side of ocean breeze, and the view is so good, even the seagulls envy it!",
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
        description: "Escape the hustle and bustle at Burchwood Cabins – where WiFi is weak, but the connection with nature is strong. Warning: May cause an uncontrollable urge to hug trees.",
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
        description: "Bland Apartments – because who needs excitement when you can gaze out your window at the thrilling comings and goings of the local park squirrels? Not your average adrenaline rush!",
        price: 300
      },
      {
        ownerId: 4,
        address: '1011 maple dr',
        city: 'Maple Syrup',
        state: 'Ontario',
        country: 'Canada',
        lat: 35.0000,
        lng: 40.0000,
        name: 'Syrup Place',
        description:  "Welcome to Syrup Place – where the beds are as fluffy as pancakes, and the morning alarm is the sweet aroma of maple goodness. Warning: May induce syrupy dreams!",
        price: 99.99
      },
      {
        ownerId: 5,
        address: '123 missing st',
        city: 'Lost',
        state: 'NA',
        country: 'nowhere',
        lat: 25.0000,
        lng: 71.0000,
        name: 'the dark zone',
        description:  "Welcome to The Dark Zone – where the brave come to stay and the timid... well, they might want to bring a nightlight. Enter if you dare, but don’t say we didn’t warn you – the shadows have secrets!",
        price: 49.99
      },
      {
        ownerId: 1,
        address: '789 Sunflower Lane',
        city: 'Sunnyville',
        state: 'CA',
        country: 'USA',
        lat: 36.7783,
        lng: -119.4179,
        name: 'Sunflower Retreat',
        description: "At Sunflower Retreat, embrace the sunshine and let your worries wilt away. Our rooms are brighter than the sunflowers in our garden, and our vibe is as warm as a summer day. Warning: May cause perpetual smiles.",
        price: 129.99
      },
      {
        ownerId: 1,
        address: '456 Serenity Street',
        city: 'Tranquil City',
        state: 'AZ',
        country: 'USA',
        lat: 34.0489,
        lng: -111.0937,
        name: 'Zen Den Oasis',
        description: "Find your inner 'om' at Zen Den Oasis – where tranquility meets trendiness. Feel the stress melt away as you enter a world of calm aesthetics and inner peace. No need for a passport on this journey.",
        price: 179.99
      },
      {
        ownerId: 2,
        address: '101 Pixel Lane',
        city: 'Digital City',
        state: 'TX',
        country: 'USA',
        lat: 31.9686,
        lng: -99.9018,
        name: 'Pixel Palace',
        description: "Enter the digital realm at Pixel Palace – where every room is a pixel, and reality is what you make of it. Immerse yourself in the vibrant colors of our LED-lit wonderland. Attention gamers: High scores not guaranteed.",
        price: 249.99
      },
      {
        ownerId: 3,
        address: '555 Enchantment Drive',
        city: 'Mysticville',
        state: 'CO',
        country: 'USA',
        lat: 39.5501,
        lng: -105.7821,
        name: 'Mystic Mansion',
        description: "Step into the enchanting world of Mystic Mansion, where every corner has a story and every room has a touch of magic. Disclaimer: Occasional ghostly giggles may add to the charm.",
        price: 299.99
      },
      {
        ownerId: 4,
        address: '222 Hearthstone Lane',
        city: 'Snuggleburg',
        state: 'UT',
        country: 'USA',
        lat: 39.3200,
        lng: -111.0937,
        name: 'Cozy Cove Cottages',
        description: "Escape to Cozy Cove Cottages – where 'cozy' is not just a word, but a way of life. Snuggle up by the fireplace, enjoy the rustic charm, and let the sound of the nearby creek lull you into the best nap of your life.",
        price: 159.99
      }
    ])

    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://cdn.pixabay.com/photo/2021/12/29/08/54/balcony-6901064_1280.jpg',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://cdn.pixabay.com/photo/2018/01/29/07/55/modern-minimalist-bathroom-3115450_1280.jpg',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://cdn.pixabay.com/photo/2017/07/08/23/48/dining-room-2485946_1280.jpg',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://cdn.pixabay.com/photo/2019/12/26/18/39/home-4720969_1280.jpg',
        preview: true,
      },
      {
        spotId: 1,
        url: 'https://cdn.pixabay.com/photo/2018/01/23/06/58/modern-minimalist-bedroom-3100786_1280.jpg',
        preview: true,
      },

      {
        spotId: 2,
        url: 'https://cdn.pixabay.com/photo/2017/04/26/00/15/cabin-2261205_1280.jpg',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://cdn.pixabay.com/photo/2013/03/23/04/29/master-bedroom-96086_1280.jpg',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://images.freeimages.com/images/large-previews/11a/chairs-2-1489343.jpg',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://cdn.pixabay.com/photo/2013/07/04/18/33/western-143213_1280.jpg',
        preview: true,
      },

      {
        spotId: 3,
        url: 'https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://images.freeimages.com/images/large-previews/ff8/apartments-1204257.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://cdn.pixabay.com/photo/2018/01/05/08/39/furniture-3062400_1280.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://picsum.photos/200',
        preview: true,
      },

      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2017/05/24/11/35/canada-2340312_1280.jpg',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://cdn.pixabay.com/photo/2015/04/10/00/41/food-715541_1280.jpg',
        preview: true,
      },
      
      {
        spotId: 5,
        url: 'https://cdn.pixabay.com/photo/2021/03/16/12/03/woman-6099577_1280.jpg',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://cdn.pixabay.com/photo/2020/04/03/12/12/sunflower-4998633_1280.jpg',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://cdn.pixabay.com/photo/2017/01/07/17/48/interior-1961070_1280.jpg',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://cdn.pixabay.com/photo/2015/08/04/18/50/mansion-875094_1280.jpg',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://cdn.pixabay.com/photo/2015/09/18/07/46/manor-945153_1280.jpg',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://cdn.pixabay.com/photo/2015/03/13/20/29/french-672217_1280.png',
        preview: true,
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
    await queryInterface.bulkDelete('SpotImages', {
      spotId: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    });

    await queryInterface.bulkDelete('Spots', {
      // ownerId: [1,2,3,4,5]
      address: ['123 main ave', '456 Burch st', '789 ok drive', '1011 maple dr', '123 missing st', '789 Sunflower Lane', '456 Serenity Street', '101 Pixel Lane', '555 Enchantment Drive', '222 Hearthstone Lane' ]
    });

  }
};
