const SERVICE_URL = process.env.REACT_APP_SERVICE_URL;

const basePath = '/';

const config = {
  basePath: basePath,
  protocol: 'http',
  serviceUrl: SERVICE_URL,

  requestsTimeout: 20000, // 20 seconds

  getServerUrl() {
    return this.serviceUrl;
  },

  // GET
  items() {
    return `${this.serviceUrl}/items`;
  }
};

export default config;
