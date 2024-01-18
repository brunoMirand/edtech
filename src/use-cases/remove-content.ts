import { ContentsRepository } from '@/repositories/interfaces/contents-repository';

export class RemoveContent {
  constructor(private contentRepository: ContentsRepository) { }

  async execute(id: string) {
    await this.contentRepository.delete(id);
  }
}
