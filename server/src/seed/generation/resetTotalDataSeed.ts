import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from 'src/portfolio/portfolio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResetTotalDataSeed {
  constructor(
    @InjectRepository(Portfolio) private portfolioRepository: Repository<Portfolio>,

  ) { }

  async seed(): Promise<void> {
    const repositories = [
      this.portfolioRepository,
    ];

    try {
      for (const repository of repositories) {
        const items = await repository.find();
        for (const item of items) {
          //@ts-ignore
          await repository.remove(item);
        }
      }
    } catch (error) {
      console.error('Помилка під час видалення записів:', error);
      throw error;
    }
  }
}
