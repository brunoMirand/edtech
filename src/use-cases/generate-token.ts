import { sign, SignOptions } from 'jsonwebtoken';
import { env } from '@/env';

export class GenerateToken {
  execute(input: Input): string {
    const options: SignOptions = {
      expiresIn: '365d',
    };

    const token: string = sign(input, env.JWT_SECRET_KEY, options);

    return token;
  }
}

type Input = {
  userId: string;
  role: 'admin' | 'user'
}
