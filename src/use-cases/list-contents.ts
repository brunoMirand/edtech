import { Logger } from '@/infra/logger/logger';
import { ContentsRepository } from '@/repositories/interfaces/contents-repository';

export class ListContents {
  constructor(
    private contentRepository: ContentsRepository,
    private logger: Logger
  ) { }

  async execute(page: number) {
    const contents = await this.contentRepository.list(page);
    this.logger.info('recovered contents',  { extras: { page } });
    return contents;
  }
}
