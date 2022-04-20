import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { PasswordReset } from './entities/reset.entity';
import { SendgridService } from './sendgrid.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectRepository(PasswordReset)
    private readonly resetRepo: Repository<PasswordReset>,
    private mailService: SendgridService,
    private authService: AuthService,
  ) {}

  async create(email: string): Promise<object> {
    let token = Math.random().toString(20).substring(2, 12);

    this.resetRepo.create({
      email,
      token,
    });
    await this.resetRepo.save({ email, token });

    const url = `http://localhost:3000/reset-password/${token}`;

    const mail = {
      to: email,
      subject: 'Reset you password',
      html: `Click <a href="${url}">here</a> to reset your password`,
      from: 'staysignal@outlook.com',
    };

    await this.mailService.send(mail);

    return {
      message: 'Success please check your mail',
    };
  }

  async resetPassword(
    token: string,
    password: string,
    password_confirm: string,
  ) {
    if (password !== password_confirm) {
      throw new BadRequestException('Passwords do not match');
    }
    // Get token & email from password_reset table
    const foundToken = await this.resetRepo.findOne({ token });
    const email = foundToken.email;

    // Identify user from email
    const user = await this.authService.findByEmail(email);

    // Hash new password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update users password
    await this.authService.updateUser(user.id, { password: hashedPassword });

    return {
      message: 'Successfully updated',
    };
  }
}
