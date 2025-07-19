import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/entities/user.entity';
import { META_ROLES } from 'src/user/decorators/get-user-protecter.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validRoles || validRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user)
      throw new UnauthorizedException('User not found in request context');

    for (const rol of user.dataValues.rol) {
      if (validRoles.includes(rol)) {
        return true;
      }
    }
    throw new ForbiddenException('User not Authorized for this action');
  }
}
