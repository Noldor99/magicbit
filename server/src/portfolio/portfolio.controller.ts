import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { QueryPortfolioParamsDto } from './dto/query-portfolio-params.dto';

@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) { }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.create(createPortfolioDto);
  }

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 4 })
  @ApiQuery({ name: 'searchEmail', type: String, required: false })
  @ApiQuery({ name: 'searchNumber', type: Number, required: false })
  getAll(@Query() params: QueryPortfolioParamsDto) {

    return this.portfolioService.getAll(params);

  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the portfolio' })
  getOne(@Param('id') id: string) {
    return this.portfolioService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') portfolioId: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return await this.portfolioService.editPortfolio(portfolioId, updatePortfolioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioService.remove(id);
  }
}
