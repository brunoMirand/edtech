import { PrismaContentsRepository } from '@/repositories/prisma/prisma-contents-repository';
import { PrismaViewsRepository } from '@/repositories/prisma/prisma-views-repository';
import { CreateContent } from '@/use-cases/create-content';
import { ListContents } from '@/use-cases/list-contents';
import { UpdateContent } from '@/use-cases/update-content';
import { RemoveContent } from '@/use-cases/remove-content';
import { ListContentById } from '@/use-cases/list-content-by-id';
import { PinoLogger } from '@/infra/logger/pino-logger';

export class ContentsUseCasesFactory {
  static make() {
    const contentRepository = new PrismaContentsRepository();
    const viewsRepository = new PrismaViewsRepository();
    const logger = new PinoLogger();

    return {
      createContent: new CreateContent(contentRepository, logger),
      updateContent: new UpdateContent(contentRepository),
      listContents: new ListContents(contentRepository),
      removeContent: new RemoveContent(contentRepository),
      listContentById: new ListContentById(contentRepository, viewsRepository),
    };
  }
}
