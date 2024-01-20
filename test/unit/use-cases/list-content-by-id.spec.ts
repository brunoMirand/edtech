import { InMemoryContentsRepository } from '@/repositories/in-memory/in-memory-contents-repository';
import { InMemoryViewsRepository } from '@/repositories/in-memory/in-memory-views-repository';
import { ListContentById } from '@/use-cases/list-content-by-id';
import { Content, InputContent } from '@/domain/entities/content';

let contentRepository: InMemoryContentsRepository;
let viewsRepository: InMemoryViewsRepository;
let sut: ListContentById;

describe('Use Case - List Content By Id', () => {
  beforeEach(() => {
    contentRepository = new InMemoryContentsRepository();
    viewsRepository = new InMemoryViewsRepository();
    sut = new ListContentById(contentRepository, viewsRepository);
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

    //when
    const response = await sut.execute(content.id, userId) as Content;

    //then
    expect(response.id).toBe(content.id);
    expect(response.views).toBe(1);
    expect(response.name).toBe('Comunicação Assíncrona');
  });

  it('should return empty list when not found content by id', async () => {
    //given
    const id = 'fake-id';
    const userId = 'fake-id';

    //when
    const response = await sut.execute(id, userId);

    //then
    expect(response).toEqual(expect.arrayContaining([]));
  });
});
