export interface ContentsRepository {
  create(data: Input): Promise<Output>;
  update(id: string, data: Input): Promise<Output>;
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
