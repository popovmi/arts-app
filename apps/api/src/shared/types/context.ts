import { Request, Response } from 'express';

export interface AppContext {
    currentUserId?: string;
    session?: Request['session'];
    httpContext: {
        req: Request;
        res: Response;
    };
}
