import { GenerateToken } from '@/use-cases/generate-token';
const sut = new GenerateToken();

type Input = {
  userId: string;
  role: 'admin' | 'student'
}

describe('Use Case - Generate Token', () => {
  it('should create token', async () => {
    //given
    const inputToken: Input = {
      userId: '1231a2',
      role: 'admin',
    };

    //when
    const response = sut.execute(inputToken);

    //then

    expect(response).toEqual(expect.any(String));
    expect(response).toBeTruthy();
  });
});