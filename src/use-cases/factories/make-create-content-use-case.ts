import { PrismaContentsRepository } from '@/repositories/prisma/prisma-contents-repository';
import { CreateContent } from '@/use-cases/create-content';

export function makeCreateContentUseCase(): CreateContent {
  const contentRepository = new PrismaContentsRepository();
  return new CreateContent(contentRepository);
}
