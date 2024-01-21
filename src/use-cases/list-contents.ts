import { Logger } from '@/infra/logger/logger';
import { ContentsRepository } from '@/repositories/interfaces/contents-repository';

export class ListContents {
  constructor(
    private contentRepository: ContentsRepository,
    private logger: Logger
  ) { }

  async execute(offset: number, limit: number) {
    const contents = await this.contentRepository.list(offset, limit);
    this.logger.info('recovered contents',  { extras: { offset, limit } });
    return contents;
  }
}
