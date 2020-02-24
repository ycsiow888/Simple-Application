import { expect } from 'chai';
import { assert } from 'chai';
import 'mocha';

import App from './app';

describe('App()', () => {
  it('App is a class', () => {
    const result = new App({
      port: 5000,
      middleWares: [],
      postMiddlewares: []
    });
    expect(result).to.be.an.instanceof(App);
  });
});
