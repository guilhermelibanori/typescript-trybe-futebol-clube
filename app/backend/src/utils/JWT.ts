import { JwtPayload, Secret, SignOptions, verify, sign } from 'jsonwebtoken';

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || '';

  private static jwtConfig: SignOptions = {
    algorithm: 'HS256', expiresIn: '7d',
  };

  static sign(payload: JwtPayload): string {
    return sign(payload, JWT.secret, JWT.jwtConfig);
  }

  static verify(token: string):JwtPayload | string {
    try {
      const bearer = token.split(' ')[1] || token;
      return verify(bearer, JWT.secret) as JwtPayload;
    } catch (e) {
      return 'Token must be a valid token';
    }
  }
}
