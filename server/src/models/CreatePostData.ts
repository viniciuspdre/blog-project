
export interface CreatePostData {
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  cover_image_url: string | null;
  authorId: number;
  categoryId: number;
  tagIds: number[];
}