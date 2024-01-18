import { prisma } from '@/infra/prisma';
import { ContentsRepository } from '@/repositories/interfaces/contents-repository';

export class PrismaContentsRepository implements ContentsRepository {
  async create(data: Input) {
    const content = await prisma.content.create({
      data,
    });

    return content;
  }

  async update(id: string, data: Input) {
    const content = await prisma.content.update({
      where: {
        id
      },
      data: {
        name: data.name,
        description: data.description,
        type: data.type,
      }
    });

    return content;
  }

  async list() {
    const contents = await prisma.content.findMany();
    return contents;
  }

  async delete(id: string) {
    await prisma.content.delete({
      where: {
        id,
      },
    });
  }

  async findById(id: string) {
    const content = await prisma.content.findUnique({
      where: {
        id
      },
    });

    return content;
  }
}

type Input = {
  name: string;
  description: string;
  type: 'video' | 'pdf' | 'image';
}
