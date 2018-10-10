const ip = require('ip');
const SERVER_PORT = require('../../config').SERVER_PORT;
const port = process.env.PORT || SERVER_PORT;

const url = `http://${ip.address()}:${port}`;

const responseSuccess = {
  items: [
    {
      itemImage: url + '/images/boat.jpg',
      itemTitle: 'Boat',
      itemDescription: 'Lonely boat'
    },
    {
      itemImage: url + '/images/rain.jpg',
      itemTitle: 'Rain',
      itemDescription: 'Sunset rain'
    },
    {
      itemImage: url + '/images/lake.jpg',
      itemTitle: 'Lake',
      itemDescription: 'Nice lake'
    }
  ]
};

const responseError = {
  error: {
    code: 'server error',
    message: 'We encountered an error. Please try again later.'
  }
};

module.exports = {
  responses: {
    method: 'GET',
    endpoint: '/items',
    errorEndpoint: '/itemserror',
    success: responseSuccess,
    error: responseError
  }
};
