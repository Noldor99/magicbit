import { IsNumberString, IsOptional, Length } from 'class-validator';

export class QueryPortfolioParamsDto {
  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;

  @IsOptional()
  @Length(3, 255)
  searchEmail?: string;

  @IsOptional()
  @IsNumberString()
  @Length(3, 55)
  searchNumber?: number;
}
