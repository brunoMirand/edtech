import { InMemoryContentsRepository } from '@/repositories/in-memory/in-memory-contents-repository';
import { RemoveContent } from '@/use-cases/remove-content';

let contentRepository: InMemoryContentsRepository;
let sut: RemoveContent;

describe('Use Case - Remove Content', () => {
  beforeEach(() => {
    contentRepository = new InMemoryContentsRepository();
    sut = new RemoveContent(contentRepository);
  });

  it('should remove content with success', async () => {
    //given
    const inputContent: Input = {
      name: 'Comunicação Assíncrona',
      description: 'Aprenda como se comunicar em ambientes remotos',
      type: 'pdf',
    };

    const content = await contentRepository.create(inputContent);
    expect(content).toBeDefined();

    //when//then
    expect(await sut.execute(content.id)).toBe(void 0);
  });
});


type Input = {
  name: string;
  description: string;
  type: 'video' | 'pdf' | 'image';
}