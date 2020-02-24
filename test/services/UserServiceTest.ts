import { expect } from 'chai';
import 'mocha';

import { UserService } from './UserService';

describe('Class UserService()', () => {
  it('UserService is a class', () => {
    const result = new UserService();
    expect(result).to.be.an.instanceof(UserService);
  });

  describe('suspendUserWithEmail()', () => {
    it('suspendUserWithEmail("student01@hotmail.com") argument is a string', () => {
      expect('student01@hotmail.com').to.be.a('string');
    });
    it('suspendUserWithEmail("student01@hotmail.com") will return true if success', async () => {
      const result = await new UserService().suspendUserWithEmail(
        'student01@hotmail.com'
      );
      expect(result).to.be.true;
    });
  });
});
