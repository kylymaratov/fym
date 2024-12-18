// express-session.d.ts
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    access_token: string;
    user_agent: string;
    user_ip: string;
    recently_plays: string[];
  }
}
