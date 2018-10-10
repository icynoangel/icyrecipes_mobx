import config from './../../../src/client/js/config/config';

describe('Config', function() {
  it('Should return server url', () => {
    expect(config.getServerUrl()).toEqual(process.env.REACT_APP_SERVICE_URL);
  });

  it('Should return items end point url', () => {
    const expected = `${process.env.REACT_APP_SERVICE_URL}/items`;
    expect(config.items()).toEqual(expected);
  });
});
