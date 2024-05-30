import { Module } from '@nestjs/common'
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';
import { DatabaseModule } from "./database/database.module";
import { PortfolioModule } from './portfolio/portfolio.module';


@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/api',
      rootPath: path.resolve(__dirname, 'static'),
    }),
    DatabaseModule,
    PortfolioModule
  ]
})

export class AppModule { }
