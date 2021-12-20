import { RegisterDto } from 'src/auth/dtos/register.dto';

describe('RegisterDto', () => {
  it('should be defined', () => {
    expect(new RegisterDto()).toBeDefined();
  });
});
