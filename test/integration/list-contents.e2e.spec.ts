import request from 'supertest';
import { app } from '@/app';
import { tokens } from '../mocks';
import { prisma } from '@/infra/database/prisma';

describe('GET /contents', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able list contents', async () => {
    await prisma.content.createMany({
      data: [
        {
          name: 'Aprenda a fazer testes de integração',
          description: 'Não seja apenas uma formiga',
          type: 'pdf',
        },
        {
          name: 'O que o trofeu de testes?',
          description: 'Não seja apenas uma formiga',
          type: 'video',
        },
        {
          name: 'Cypress ou Playwright',
          description: 'Não seja apenas uma formiga',
          type: 'image',
        }
      ]
    });


    const response = await request(app.server)
      .get('/contents')
      .set('authorization', `Bearer ${tokens.student}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([
      {
        id: expect.any(String),
        name: 'Aprenda a fazer testes de integração',
      },
      {
        id: expect.any(String),
        name: 'O que o trofeu de testes?',
      },
      {
        id: expect.any(String),
        name: 'Cypress ou Playwright',
      }
    ]);
  });

  it('should be able list contents using pagination', async () => {
    await prisma.content.createMany({
      data: [
        {
          name: 'Seja sempre você',
          description: 'Não seja apenas uma formiga',
          type: 'pdf',
        },
        {
          name: 'Faça o que é melhor pra ambos',
          description: 'Não seja apenas uma formiga',
          type: 'video',
        },
        {
          name: 'Pense bem antes, mas não muito',
          description: 'Não seja apenas uma formiga',
          type: 'image',
        }
      ]
    });


    const response = await request(app.server)
      .get('/contents?offset=1&limit=1')
      .set('authorization', `Bearer ${tokens.student}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([
      {
        id: expect.any(String),
        name: 'Faça o que é melhor pra ambos',
      },
    ]);
    expect(response.body).toHaveLength(1);
  });
});
