import { InMemoryContentsRepository } from '@/repositories/in-memory/in-memory-contents-repository';
import { CreateContent } from '@/use-cases/create-content';

let contentRepository: InMemoryContentsRepository;
let sut: CreateContent;
type Input = {
  name: string;
  description: string;
  type: 'video' | 'pdf' | 'image';
};

describe('Use Case - Create Content', () => {
  beforeEach(() => {
    contentRepository = new InMemoryContentsRepository();
    sut = new CreateContent(contentRepository);
  });

  it('should return success when create content', async () => {
    //given
    const inputContent: Input = {
      name: 'Comunicação Assíncrona',
      description: 'Aprenda como se comunicar em ambientes remotos',
      type: 'pdf',
    };
    const role = 'admin';

    //when
    const response = await sut.execute(inputContent, role);
    //then
    expect(response.name).toBe('Comunicação Assíncrona');
  });

  it('should return an exception when trying to create content with a non-admin user', async () => {
    //given
    const inputContent: Input = {
      name: 'Comunicação Assíncrona',
      description: 'Aprenda como se comunicar em ambientes remotos',
      type: 'pdf',
    };

    const role = 'student';
    //when//then
    await expect(() => sut.execute(inputContent, role)).rejects.toThrow(new Error('User does not have permission for this feature.'));
  });
});
