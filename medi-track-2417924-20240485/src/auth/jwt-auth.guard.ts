import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any, context: any) {
        if (err || !user) {
          throw new UnauthorizedException('Your token is invalid or expired. Please log in again.');
        }
        return user;
      }
}
