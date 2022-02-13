import { Request, Response } from 'express';
import { Session } from 'express-session';

export interface AppContext {
  currentUserId?: string;
  session?: Session;
  httpContext: {
    req: Request;
    res: Response;
  };
}
