import { ContentsRepository } from '@/repositories/interfaces/contents-repository';

export class ListContents {
  constructor(private contentRepository: ContentsRepository) { }

  async execute(offset: number = 0, limit: number = 5) {
    const contents = await this.contentRepository.list(offset, limit);
    return contents;
  }
}
