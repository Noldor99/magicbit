import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Portfolio } from "./portfolio.entity"
import { Repository } from "typeorm"
import { CreatePortfolioDto } from "./dto/create-portfolio.dto"
import { QueryPortfolioParamsDto } from "./dto/query-portfolio-params.dto"
import { UpdatePortfolioDto } from "./dto/update-portfolio.dto"

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>
  ) { }


  async create(dto: CreatePortfolioDto): Promise<Portfolio> {

    const portfolio = this.portfolioRepository.create(dto);
    return await this.portfolioRepository.save(portfolio);
  }

  async getAll(dto: QueryPortfolioParamsDto) {
    const { page = 1, limit = 4, searchEmail, searchNumber } = dto;

    await new Promise(resolve => setTimeout(resolve, 3 * 1000));

    try {
      let queryBuilder = this.portfolioRepository.createQueryBuilder('portfolio')
        .orderBy('portfolio.createdAt', 'DESC')
        .skip((+page - 1) * +limit)
        .take(+limit);

      if (searchEmail) {
        queryBuilder = queryBuilder.andWhere('portfolio.email LIKE :searchEmail', { searchEmail: `%${searchEmail}%` });
      }

      if (searchNumber) {
        queryBuilder = queryBuilder.andWhere('CAST(portfolio.number AS TEXT) LIKE :searchNumber', { searchNumber: `%${searchNumber}%` });
      }

      const [portfolios, totalCount] = await queryBuilder.getManyAndCount();

      console.log('Generated Query:', queryBuilder.getSql());
      console.log('Parameters:', queryBuilder.getParameters());

      return { totalCount, portfolios };
    } catch (e) {
      console.error('Error executing query:', e);
      return { totalCount: 0, portfolios: [] };
    }
  }




  async findOne(id: string): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id },
      relations: {},
    })

    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`)
    }

    return portfolio
  }

  async editPortfolio(portfolioId: string, dto: UpdatePortfolioDto) {
    const portfolio = await this.findOne(portfolioId);


    const dtoFilter = Object.keys(dto).reduce((acc, key) => {
      if (dto[key]) acc[key] = dto[key];
      return acc;
    }, {});

    Object.assign(portfolio, dtoFilter);

    const updatedPortfolio = await this.portfolioRepository.save(portfolio);
    return updatedPortfolio;
  }


  async remove(id: string) {
    const portfolio = await this.findOne(id);
    return this.portfolioRepository.remove(portfolio)
  }

}
