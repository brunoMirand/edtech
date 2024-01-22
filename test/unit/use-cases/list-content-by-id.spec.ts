import { InMemoryContentsRepository } from '@/repositories/in-memory/in-memory-contents-repository';
import { InMemoryViewsRepository } from '@/repositories/in-memory/in-memory-views-repository';
import { ListContentById } from '@/use-cases/list-content-by-id';
import { Content, InputContent } from '@/domain/entities/content';
import { PinoLogger } from '@/infra/logger/pino-logger';

jest.mock('@/infra/logger/pino-logger');

describe('Use Case - List Content By Id', () => {
  let contentRepository: InMemoryContentsRepository;
  let viewsRepository: InMemoryViewsRepository;
  let logger: jest.Mocked<PinoLogger>;
  let sut: ListContentById;

  beforeEach(() => {
    contentRepository = new InMemoryContentsRepository();
    viewsRepository = new InMemoryViewsRepository();
    logger = new PinoLogger() as jest.Mocked<PinoLogger>;
    sut = new ListContentById(contentRepository, viewsRepository, logger);
  });

  it('should return content by id', async () => {
    //given
    const inputContent: InputContent = {
      name: 'Comunicação Assíncrona',
      description: 'Aprenda como se comunicar em ambientes remotos',
      type: 'pdf',
    };

    const content = await contentRepository.create(inputContent);
    const userId = content.id;
    const role = 'student';


    //when
    const response = await sut.execute(content.id, userId, role) as Content;

    //then
    expect(response.id).toBe(content.id);
    expect(response.views).toBe(1);
    expect(response.name).toBe('Comunicação Assíncrona');
  });

  it('should return empty list when not found content by id', async () => {
    //given
    const id = 'fake-id';
    const userId = 'fake-id';
    const role = 'student';


    //when
    const response = await sut.execute(id, userId, role);

    //then
    expect(response).toEqual(expect.arrayContaining([]));
  });

  it('should not be counted when viewed by an admin', async () => {
    //give
    const inputContent: InputContent = {
      name: 'Comunicação Assíncrona',
      description: 'Aprenda como se comunicar em ambientes remotos',
      type: 'pdf',
    };

    const content = await contentRepository.create(inputContent);

    const id = content.id;
    const userId = 'fake-id';
    const role = 'admin';

    //when
    const response = await sut.execute(id, userId, role) as Content;

    //then
    expect(response.views).toBe(0);
    expect(response.name).toBe('Comunicação Assíncrona');
  });
});
