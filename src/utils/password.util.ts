import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswrodUtil {
  hashPassword(password: string, salt: number = 12): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt
        .hash(password, salt)
        .then((hashedPassword) => {
          resolve(hashedPassword);
        })
        .catch((error) => reject(error));
    });
  }

  matchPassword(password: string, hashedPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt
        .compare(password, hashedPassword)
        .then((isMatch) => {
          resolve(isMatch);
        })
        .catch((error) => reject(error));
    });
  }
}
