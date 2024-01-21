import request from 'supertest';
import { app } from '@/app';
import { tokens } from '../mocks';
import { prisma } from '@/infra/database/prisma';

describe('DELETE /contents', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able remove content', async () => {
    const content = await prisma.content.create({
      data: {
        name: 'Aprenda a fazer testes de integração',
        description: 'Não seja apenas uma formiga',
        type: 'pdf',
      },
    });

    const response = await request(app.server)
      .delete(`/contents/${content.id}`)
      .set('authorization', `Bearer ${tokens.admin}`);

    expect(response.statusCode).toEqual(204);
    expect(response.body).toEqual({});
  });

  it('should not be able to remove content if not an admin', async () => {
    const response = await request(app.server)
      .delete('/contents/1231')
      .set('authorization', `Bearer ${tokens.student}`);

    expect(response.statusCode).toEqual(403);
  });

  it('should return unable to remove content', async () => {
    const response = await request(app.server)
      .delete('/contents/1231')
      .set('authorization', `Bearer ${tokens.admin}`);

    expect(response.statusCode).toEqual(422);
  });
});
