import randomString from 'randomstring';
import jsonwebtoken, {JwtPayload} from 'jsonwebtoken';

// Errors
const errors = {
  validation: 'JSON-web-token validation failed.',
} as const;

// Constants
const secret = process.env.JWT_SECRET || randomString.generate(100),
  options = {expiresIn: process.env.COOKIE_EXP || 120120};

// Types
type TDecoded = string | JwtPayload | undefined;

export const sign = (data: JwtPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(data, secret, options, (err, token) => {
      err ? reject(err) : resolve(token || '');
    });
  });
};

export const decode = (jwt: string): Promise<TDecoded> => {
  return new Promise((res, rej) => {
    jsonwebtoken.verify(jwt, secret, (err, decoded) => {
      return err ? rej(errors.validation) : res(decoded);
    });
  });
};
