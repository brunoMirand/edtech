import { ContentsRepository } from '@/repositories/interfaces/contents-repository';

export class ListContents {
  constructor(private contentRepository: ContentsRepository) { }

  async execute(offset: number, limit: number) {
    const contents = await this.contentRepository.list(offset, limit);
    return contents;
  }
}
