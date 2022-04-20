import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordReset } from './entities/reset.entity';
import { SendgridService } from './sendgrid.service';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectRepository(PasswordReset)
    private readonly resetRepo: Repository<PasswordReset>,
    private mailService: SendgridService,
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
}
