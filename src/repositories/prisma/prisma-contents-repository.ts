import { prisma } from '@/infra/prisma';
import { ContentsRepository } from '@/repositories/interfaces/contents-repository';

export class PrismaContentsRepository implements ContentsRepository {
  async create(data: Input) {
    const content = await prisma.content.create({
      data,
    });

    return content;
  }
}

type Input = {
  name: string;
  description: string;
  type: 'video' | 'pdf' | 'image';
}
