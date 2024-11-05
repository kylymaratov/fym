import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { serverEnv } from 'src/server/server.env';

@Injectable()
export class TokenUtil {
  getToken(data: any = {}, exp: string | number = '1d'): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        data,
        serverEnv.env.TOKEN_SECRET,
        { expiresIn: exp },
        (error, token) => {
          if (error) return reject(error);

          resolve(token as string);
        },
      );
    });
  }

  decodeToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, serverEnv.env.TOKEN_SECRET, (error, decoded) => {
        if (error) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
