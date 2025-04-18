

export interface CreatePostServiceData {
  title: string;
  excerpt?: string | null;
  content: string;
  coverImageFile?: Express.Multer.File;
  authorId: number; 
  categoryId: number;
  tags?: string[]; 
}