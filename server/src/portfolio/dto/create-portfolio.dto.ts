import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty({
    example: 'qwer@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly email: string;

  @ApiProperty({
    example: 221122,
  })
  @IsNotEmpty()
  @Length(3, 55)
  readonly number: number;
}
