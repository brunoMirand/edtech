import { randomUUID } from 'node:crypto';
import { ContentsRepository } from '@/repositories/interfaces/contents-repository';

export class InMemoryContentsRepository implements ContentsRepository {
  private contents: Map<string, Output> = new Map();

  async create(data: Input) {
    const content = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      type: data.type,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.contents.set(content.id, content);
    return content;
  }

  async update(id: string, data: Input) {
    const content = {
      id,
      name: data.name,
      description: data.description,
      type: data.type,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.contents.set(id, content);
    return content;
  }

  async list() {
    const contents = Array.from(this.contents.values());
    return contents;
  }

  async delete(id: string) {
    this.contents.delete(id);
  }

  async findById(id: string) {
    return this.contents.get(id);
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
  updated_at: Date;
}
