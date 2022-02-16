import 'express-session';
import { AppSessionData } from '@/modules/auth';

declare module 'express-session' {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface SessionData extends AppSessionData {}
}
