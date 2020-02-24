import { expect } from 'chai';
import 'mocha';

import { CommonService } from './CommonService';

describe('Class CommonService()', () => {
  it('CommonService is a class', () => {
    const result = new CommonService();
    expect(result).to.be.an.instanceof(CommonService);

    describe('extractReceipientFromText()', () => {
      it('extractReceipientFromText() argument expect type string', () => {
        const result = new CommonService().extractReceipientFromText(
          '@siowyungchuen@hotmail.com',
          '@'
        );
        expect('@siowyungchuen@hotmail.com', '@').to.be.a('string');
      });
      it('extractReceipientFromText() expect return type array', async () => {
        const result = await new CommonService().extractReceipientFromText(
          '@siowyungchuen@hotmail.com',
          '@'
        );
        expect(result).to.be.an('array');
      });
    });

    describe('query(raw,replacement,queryType)', () => {
      it('select * from users will return user array', async () => {
        const result = await new CommonService().query(
          'select * from users',
          '',
          'SELECT'
        );
        expect(result).to.be.an('array');
      });
      it('return data index 0 id is a number', async () => {
        const result = await new CommonService().query(
          'select * from users',
          '',
          'SELECT'
        );
        expect(result[0].id).to.be.a('number');
      });
    });
  });
});
