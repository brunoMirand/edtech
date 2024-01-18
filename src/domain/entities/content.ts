export type Content = {
  id: string;
  name: string;
  description: string;
  type: 'video' | 'pdf' | 'image';
  views: number;
  created_at: Date;
  updated_at: Date;
}

export type InputContent = Omit<Content, 'id' | 'created_at' | 'updated_at' | 'views'>;
