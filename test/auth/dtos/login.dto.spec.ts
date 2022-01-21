import { LoginDto } from '../../../src/auth/dtos';

describe('LoginDto', () => {
  it('should be defined', () => {
    expect(new LoginDto()).toBeDefined();
  });
});
