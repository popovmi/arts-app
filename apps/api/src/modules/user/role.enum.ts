import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Role, {
  name: 'Role',
  valuesMap: {
    ADMIN: { description: 'Administrator Role' },
    USER: { description: 'Simple user role' },
  },
});
