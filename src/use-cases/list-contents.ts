import { ContentsRepository } from '@/repositories/interfaces/contents-repository';
import { Logger } from '@/infra/logger/interface';
import { Cache } from '@/infra/cache/interface';

export class ListContents {
  constructor(
    private contentRepository: ContentsRepository,
    private logger: Logger,
    private cache: Cache,
  ) { }

  async execute(page: number) {
    const cacheKey = `contents:page:${page}`;
    const cachedContents = await this.cache.get(cacheKey);

    if (cachedContents) {
      this.logger.info('retrieved contents from cache');
      return JSON.parse(cachedContents);
    }

    const contents = await this.contentRepository.list(page);
    if (contents.length !== 0) {
      this.logger.info('save contents in cache');
      await this.cache.set(cacheKey, JSON.stringify(contents));
    }

    this.logger.info('recovered contents',  { extras: { page } });
    return contents;
  }
}
