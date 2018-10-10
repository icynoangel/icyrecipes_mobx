import ajax from './../../../src/client/js/services/ajax';
import * as superagent from 'superagent';
import config from './../../../src/client/js/config/config';

describe('Services - Ajax', function() {
  beforeEach(() => {
    this.url = 'http://testurl';
    this.data = {test: 'testdata'};
    this.headers = {key: 'value'};

    superagent.__setMockResponseBody('mock-response');
    superagent.__setMockError(undefined);
  });

  it('Should call post related methods from Superagent and resolve', done => {
    const promise = ajax.post(this.url, this.data, this.headers);
    expect(superagent.post).toHaveBeenCalled();
    expect(superagent.post).toHaveBeenCalledWith(this.url);
    expect(superagent.set).toHaveBeenCalledWith(
      'Content-Type',
      'application/json'
    );
    expect(superagent.set).toHaveBeenCalledWith('key', 'value');
    expect(superagent.send).toHaveBeenCalledWith(this.data);
    expect(superagent.timeout).toHaveBeenCalledWith(config.requestsTimeout);
    expect(superagent.end).toHaveBeenCalled();

    promise.then(response => {
      expect(response).toEqual('mock-response');
      done();
    });
  });

  it('Should call post related methods from Superagent and reject', done => {
    superagent.__setMockError('mock-error');
    const promise = ajax.post(this.url, this.data);

    promise.catch(error => {
      expect(error).toEqual('mock-error');
      done();
    });
  });

  it('Should call get related methods from Superagent and resolve', done => {
    const promise = ajax.get(this.url, this.headers);
    expect(superagent.get).toHaveBeenCalled();
    expect(superagent.get).toHaveBeenCalledWith(this.url);
    expect(superagent.set).toHaveBeenCalledWith(
      'Content-Type',
      'application/json'
    );
    expect(superagent.set).toHaveBeenCalledWith('key', 'value');
    expect(superagent.timeout).toHaveBeenCalledWith(config.requestsTimeout);
    expect(superagent.end).toHaveBeenCalled();

    promise.then(response => {
      expect(response).toEqual('mock-response');
      done();
    });
  });

  it('Should call get related methods from Superagent and reject', done => {
    superagent.__setMockError('mock-error');
    const promise = ajax.get(this.url);

    promise.catch(error => {
      expect(error).toEqual('mock-error');
      done();
    });
  });

  it('Should call del related methods from Superagent and resolve', done => {
    const promise = ajax.del(this.url, this.headers);
    expect(superagent.del).toHaveBeenCalled();
    expect(superagent.del).toHaveBeenCalledWith(this.url);
    expect(superagent.set).toHaveBeenCalledWith(
      'Content-Type',
      'application/json'
    );
    expect(superagent.set).toHaveBeenCalledWith('key', 'value');
    expect(superagent.timeout).toHaveBeenCalledWith(config.requestsTimeout);
    expect(superagent.end).toHaveBeenCalled();

    promise.then(response => {
      expect(response).toEqual('mock-response');
      done();
    });
  });

  it('Should call del related methods from Superagent and reject', done => {
    superagent.__setMockError('mock-error');
    const promise = ajax.del(this.url);

    promise.catch(error => {
      expect(error).toEqual('mock-error');
      done();
    });
  });

  it('Should call put related methods from Superagent and resolve', done => {
    const promise = ajax.put(this.url, this.data, this.headers);
    expect(superagent.put).toHaveBeenCalled();
    expect(superagent.put).toHaveBeenCalledWith(this.url);
    expect(superagent.set).toHaveBeenCalledWith(
      'Content-Type',
      'application/json'
    );
    expect(superagent.set).toHaveBeenCalledWith('key', 'value');
    expect(superagent.send).toHaveBeenCalledWith(this.data);
    expect(superagent.timeout).toHaveBeenCalledWith(config.requestsTimeout);
    expect(superagent.end).toHaveBeenCalled();

    promise.then(response => {
      expect(response).toEqual('mock-response');
      done();
    });
  });

  it('Should call put related methods from Superagent and reject', done => {
    superagent.__setMockError('mock-error');
    const promise = ajax.put(this.url, this.data);

    promise.catch(error => {
      expect(error).toEqual('mock-error');
      done();
    });
  });
});
