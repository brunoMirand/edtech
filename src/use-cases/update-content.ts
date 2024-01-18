import { ContentsRepository } from '@/repositories/interfaces/contents-repository';

export class UpdateContent {
  constructor(private contentRepository: ContentsRepository) {}

  async execute(id: string, input: Input) {
    // if (role !== 'admin') {
    //   throw new Error('User does not have permission for this feature.');
    // }
    const content = await this.contentRepository.update(id, input);
    return content;
  }
}

type Input = {
  name: string;
  description: string;
  type: 'video' | 'pdf' | 'image';
}
