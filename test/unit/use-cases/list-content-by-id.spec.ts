import { InMemoryContentsRepository } from '@/repositories/in-memory/in-memory-contents-repository';
import { ListContentById } from '@/use-cases/list-content-by-id';

let contentRepository: InMemoryContentsRepository;
let sut: ListContentById;

describe('Use Case - List Content By Id', () => {
  beforeEach(() => {
    contentRepository = new InMemoryContentsRepository();
    sut = new ListContentById(contentRepository);
  });

  it('should return content by id', async () => {
    //given
    const inputContent: Input = {
      name: 'Comunicação Assíncrona',
      description: 'Aprenda como se comunicar em ambientes remotos',
      type: 'pdf',
    };
    const content = await contentRepository.create(inputContent);

    //when
    const response = await sut.execute(content.id) as Output;

    //then
    expect(response.id).toBe(content.id);
    expect(response.name).toBe('Comunicação Assíncrona');
  });

  it('should return empty list when not found content by id', async () => {
    //given
    const id = 'fake-id';

    //when
    const response = await sut.execute(id);

    //then
    expect(response).toEqual(expect.arrayContaining([]));
  });
});

type Input = {
  name: string;
  description: string;
  type: 'video' | 'pdf' | 'image';
}

type Output = {
  id: string;
  name: string;
  description: string;
  type: 'video' | 'pdf' | 'image';
  created_at: Date;
  updated_at: Date;
}
