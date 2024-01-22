import request from 'supertest';
import { app } from '@/app';
import { tokens } from '../mocks';
import { prisma } from '@/infra/database/prisma';

describe('GET /contents/:id', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to find content by id', async () => {
    const content = await prisma.content.create({
      data: {
        name: 'Aprenda a fazer testes de integração',
        description: 'Não seja apenas uma formiga',
        type: 'pdf',
      }
    });

    const response = await request(app.server)
      .get(`/contents/${content.id}`)
      .set('authorization', `Bearer ${tokens.student}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(expect.objectContaining({
      name: 'Aprenda a fazer testes de integração',
      description: 'Não seja apenas uma formiga',
      type: 'pdf',
      views: 1,
    }));
  });

  it('should return empty list when not find content by id', async () => {

    const response = await request(app.server)
      .get('/contents/00630ed7-5c3b-4438-9bc8-8ea5bb3c1c17')
      .set('authorization', `Bearer ${tokens.student}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([]);
  });
});
