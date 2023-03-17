import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userInfo = await this.authService.decodeToken(
      context.switchToHttp().getRequest(),
    );
    return userInfo.isAdmin;
  }
}
