export interface IPortfolios {
  totalCount: number;
  portfolios: IPortfolio[];
}

export interface IPortfolio {
  id: string;
  email: string;
  number: number;
  createdAt: string;
  updatedAt: string;
}