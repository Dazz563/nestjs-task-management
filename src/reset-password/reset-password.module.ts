import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { PasswordReset } from './entities/reset.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendgridService } from './sendgrid.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PasswordReset])],
  providers: [ResetPasswordService, SendgridService],
  controllers: [ResetPasswordController],
})
export class ResetPasswordModule {}
