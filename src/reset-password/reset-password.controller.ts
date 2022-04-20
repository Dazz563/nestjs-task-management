import { Body, Controller, Post } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private resetService: ResetPasswordService) {}
  @Post()
  async forgotPassword(@Body('email') email: string): Promise<object> {
    return this.resetService.create(email);
  }
}
