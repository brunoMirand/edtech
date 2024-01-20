import request from 'supertest';
import { app } from '@/app';
import { tokens } from '../mocks/index';

describe('POST /contents', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create content', async () => {
    const response = await request(app.server)
      .post('/contents')
      .set('authorization', `Bearer ${tokens.admin}`)
      .set('Content-Type', 'application/json')
      .send({
        name: 'Escreve testes mas não mutos',
        description: 'Apenas o suficiente',
        type: 'video',
      });

    expect(response.statusCode).toEqual(201);
  });

  it('should not be able to create content if not an admin', async () => {
    const response = await request(app.server)
      .post('/contents')
      .set('authorization', `Bearer ${tokens.student}`)
      .set('Content-Type', 'application/json')
      .send({
        name: 'Escreve testes mas não mutos',
        description: 'Apenas o suficiente',
        type: 'video',
      });

    expect(response.statusCode).toEqual(403);
  });
});
