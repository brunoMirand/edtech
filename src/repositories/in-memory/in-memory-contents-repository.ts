import { ContentsRepository } from '@/repositories/interfaces/contents-repository';

export class InMemoryContentsRepository implements ContentsRepository {
  private contents: Map<string, Output> = new Map();

  async create(data: Input) {
    const content = {
      id: 'content-1',
      name: data.name,
      description: data.description,
      type: data.type,
      created_at: new Date(),
    };

    this.contents.set(content.name, content);
    return content;
  }

}

type Input = {
  name: string;
  description: string;
  type: 'video' | 'pdf' | 'image';
}

type Output = {
  id: string;
  name: string;
  description: string;
  type: 'video' | 'pdf' | 'image';
  created_at: Date;
}
