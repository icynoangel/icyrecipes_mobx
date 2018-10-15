const ip = require('ip');
const SERVER_PORT = require('../../config').SERVER_PORT;
const port = process.env.PORT || SERVER_PORT;

const url = `http://${ip.address()}:${port}`;

const responseSuccess = {
  items: [
    {
      image: url + '/images/boat.jpg',
      title: 'Boat',
      description: 'Lonely boat'
    },
    {
      image: url + '/images/rain.jpg',
      title: 'Rain',
      description: 'Sunset rain'
    },
    {
      image: url + '/images/lake.jpg',
      title: 'Lake',
      description: 'Nice lake'
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
