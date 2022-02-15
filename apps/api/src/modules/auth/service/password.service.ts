import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class PasswordService {
    public async hash(password: string) {
        return await hash(password, 10);
    }

    public async compare(password: string, hashed: string) {
        return await compare(password, hashed);
    }
}
