import { PrismaContentsRepository } from '@/repositories/prisma/prisma-contents-repository';
import { PrismaViewsRepository } from '@/repositories/prisma/prisma-views-repository';
import { CreateContent } from '@/use-cases/create-content';
import { ListContents } from '@/use-cases/list-contents';
import { UpdateContent } from '@/use-cases/update-content';
import { RemoveContent } from '@/use-cases/remove-content';
import { ListContentById } from '@/use-cases/list-content-by-id';
import { PinoLogger } from '@/infra/logger/pino-logger';
import { RedisCache } from '@/infra/cache/redis';

export class ContentsUseCasesFactory {
  static make() {
    const contentRepository = new PrismaContentsRepository();
    const viewsRepository = new PrismaViewsRepository();
    const logger = new PinoLogger();
    const redis = new RedisCache();

    return {
      createContent: new CreateContent(contentRepository, logger, redis),
      updateContent: new UpdateContent(contentRepository, logger, redis),
      listContents: new ListContents(contentRepository, logger, redis),
      removeContent: new RemoveContent(contentRepository, logger, redis),
      listContentById: new ListContentById(contentRepository, viewsRepository, logger),
    };
  }
}
