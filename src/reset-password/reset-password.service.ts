import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordReset } from './entities/reset.entity';

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectRepository(PasswordReset)
    private readonly resetRepo: Repository<PasswordReset>,
  ) {}

  async create(email: string): Promise<object> {
    let token = Math.random().toString(20).substring(2, 12);

    this.resetRepo.create({
      email,
      token,
    });
    await this.resetRepo.save({ email, token });

    return {
      message: 'Success',
    };
  }
}
