import { InMemoryContentsRepository } from '@/repositories/in-memory/in-memory-contents-repository';
import { ListContentById } from '@/use-cases/list-content-by-id';
import { Content, InputContent } from '@/domain/entities/content';

let contentRepository: InMemoryContentsRepository;
let sut: ListContentById;

describe('Use Case - List Content By Id', () => {
  beforeEach(() => {
    contentRepository = new InMemoryContentsRepository();
    sut = new ListContentById(contentRepository);
  });

  it('should return content by id', async () => {
    //given
    const inputContent: InputContent = {
      name: 'Comunicação Assíncrona',
      description: 'Aprenda como se comunicar em ambientes remotos',
      type: 'pdf',
    };

    const content = await contentRepository.create(inputContent);
    const contentViewed = [content.id];

    //when
    await sut.execute(content.id, ['']) as Content;

    const response = await sut.execute(content.id, contentViewed) as Content;

    //then
    expect(response.id).toBe(content.id);
    expect(response.views).toBe(1);
    expect(response.name).toBe('Comunicação Assíncrona');
  });

  it('should return empty list when not found content by id', async () => {
    //given
    const id = 'fake-id';
    const contentViewed = ['fake-id'];

    //when
    const response = await sut.execute(id, contentViewed);

    //then
    expect(response).toEqual(expect.arrayContaining([]));
  });
});
