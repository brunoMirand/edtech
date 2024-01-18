import { ContentsRepository } from '@/repositories/interfaces/contents-repository';

export class ListContents {
  constructor(private contentRepository: ContentsRepository) { }

  async execute() {
    const contents = await this.contentRepository.list();
    return contents;
  }
}
