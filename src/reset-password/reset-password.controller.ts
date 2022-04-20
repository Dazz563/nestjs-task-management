import { Body, Controller, Post } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';

@Controller()
export class ResetPasswordController {
  constructor(private resetService: ResetPasswordService) {}
  @Post('reset-password')
  async forgotPassword(@Body('email') email: string): Promise<object> {
    return this.resetService.create(email);
  }

  @Post('reset')
  async resetPassword(
    @Body('token') token: string,
    @Body('password') password: string,
    @Body('password_confirm') password_confirm: string,
  ) {
    return this.resetService.resetPassword(token, password, password_confirm);
  }
}
