import { z } from 'zod'
import { api } from '@/lib/axios'

import { AxiosResponse } from 'axios'
import { IPortfolio, IPortfolios } from '@/types/portfolio';

export const PortfolioSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address.' }),
  number: z
    .number()
    .min(2, { message: 'Number must be at least 2 characters.' })
    .max(50, { message: 'Number must be at most 50 characters.' }),
});

export type IPortfolioSchema = z.infer<typeof PortfolioSchema>

export interface QueryPortfolioParams {
  page?: string;
  limit?: string;
  searchEmail?: string;
  searchNumber?: string | number;
}

export interface ApiPortfolio {
  create: (body: IPortfolioSchema) => Promise<IPortfolio>;
  getAll: (params: QueryPortfolioParams) => Promise<IPortfolios>;
  getOne: (id: string) => Promise<IPortfolio>;
  update: (portfolioId: string, data: Partial<IPortfolioSchema>) => Promise<IPortfolio>;
  remove: (id: string) => Promise<void>;
}

export const apiPortfolio: ApiPortfolio = {
  create: (body) => api.post('/portfolio', body).then(qw),
  getAll: (params) => api.get('/portfolio', { params }).then(qw),
  getOne: (id) => api.get(`/portfolio/${id}`).then(qw),
  update: (portfolioId, body) => api.patch(`/portfolio/${portfolioId}`, body).then(qw),
  remove: (id) => api.delete(`/portfolio/${id}`).then(qw),
};


const qw = <T>(response: AxiosResponse<T>): T => response.data;