import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from 'src/portfolio/portfolio.entity';
import { SeederInterface } from '../seeder.interface';
import { CreatePortfolioDto } from 'src/portfolio/dto/create-portfolio.dto';


@Injectable()
export class PortfolioSeed implements SeederInterface {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) { }

  async seed() {

    const mack = [
      { email: 'jim@gmail.com', number: 221122 },
      { email: 'jam@gmail.com', number: 830347 },
      { email: 'john@gmail.com', number: 221122 },
      { email: 'jams@gmail.com', number: 349425 },
      { email: 'jams@gmail.com', number: 141424 },
      { email: 'jill@gmail.com', number: 822287 },
      { email: 'jill@gmail.com', number: 822286 },
    ];

    for (let i = 0; i < mack.length; i++) {

      const portfolioSeed: CreatePortfolioDto = {
        email: mack[i].email,
        number: mack[i].number

      };

      await new Promise(resolve => setTimeout(resolve, 10));

      await this.portfolioRepository.save(portfolioSeed);
    }
  }
}
