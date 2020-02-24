import { expect } from 'chai';
import 'mocha';

import { AssignmentService } from './AssignmentService';

describe('Class AssignmentService()', () => {
  it('AssignmentService is a class', () => {
    const result = new AssignmentService();
    expect(result).to.be.an.instanceof(AssignmentService);
  });
});
