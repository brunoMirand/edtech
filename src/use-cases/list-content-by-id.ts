import { ContentsRepository } from '@/repositories/interfaces/contents-repository';

export class ListContentById {
  constructor(private contentRepository: ContentsRepository) { }

  async execute(id: string) {
    const content = await this.contentRepository.findById(id);
    if (!content) {
      return [];
    }

    return content;
  }
}
