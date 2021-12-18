import { LoginDto } from '../../../src/auth/dtos/login.dto';

describe('LoginDto', () => {
  it('should be defined', () => {
    expect(new LoginDto()).toBeDefined();
  });
});
