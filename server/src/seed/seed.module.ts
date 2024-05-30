import { Module } from '@nestjs/common'
import { SeedService } from './seed.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module'
import { ResetTotalDataSeed } from './generation/resetTotalDataSeed';
import { Portfolio } from 'src/portfolio/portfolio.entity';
import { PortfolioSeed } from './generation/portfolioSeed';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Portfolio]),
  ],
  providers: [
    SeedService,
    ResetTotalDataSeed,
    PortfolioSeed
  ],
  exports: [SeedService]

})
export class SeedModule { }
