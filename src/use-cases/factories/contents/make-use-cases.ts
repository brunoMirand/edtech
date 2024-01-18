import { PrismaContentsRepository } from '@/repositories/prisma/prisma-contents-repository';
import { CreateContent } from '@/use-cases/create-content';
import { UpdateContent } from '@/use-cases/update-content';

export class ContentsUseCasesFactory {
  static make() {
    const contentRepository = new PrismaContentsRepository();
    return {
      createContent: new CreateContent(contentRepository),
      updateContent: new UpdateContent(contentRepository)
    };
  }
}
