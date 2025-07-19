import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '../interfaces/user-role.interface';
import { RolProtected } from './get-user-protecter.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-rol/user-rol.guards';

export function Auth(...args: UserRole[]) {
  return applyDecorators(
    RolProtected(...args),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
