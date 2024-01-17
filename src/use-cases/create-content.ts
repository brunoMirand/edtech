import { ContentsRepository } from '@/repositories/interfaces/contents-repository';

export class CreateContent {
  constructor(private contentRepository: ContentsRepository) {}

  async execute(input: Input, role: string) {
    if (role !== 'admin') {
      throw new Error('User does not have permission for this feature.');
    }
    const content = await this.contentRepository.create(input);
    return content;
  }
}

type Input = {
  name: string;
  description: string;
  type: 'video' | 'pdf' | 'image';
}
