// express-session.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    listenAccess: {
      count: number;
      lastRequest: number;
    };
    userIp: string;
  }
}
