import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../entities/user.entity';

export const GetUser = createParamDecorator(
  (data: never, context: ExecutionContext): User => {
    // Getting access to the user object
    const request = context.switchToHttp().getRequest();
    // User was assigned to the request in our jwt.strategy.ts
    return request.user;
  },
);
