import { uploadToS3 } from "../../config/aws-sdk-config";
import { CreatePostServiceData } from "../../models/createPostServiceData";
import { HttpResponse } from "../../models/http-response-models";
import { createPostRepo } from "../../repositories/postsRepositories/createPostRepo";
import { findOrCreateTagsRepo } from "../../repositories/tagsRepositories/findOrCreateTagsRepo";
import { badRequest, created, internalServerError } from "../../utils/http-helper";


const createPostService = async (data: CreatePostServiceData): Promise<HttpResponse> => {
  let response: HttpResponse | null = null;
  try {
    const { title, excerpt, content, coverImageFile, authorId, categoryId, tags} = data;

    if (!title || !content || !authorId || !categoryId) {
      response = await badRequest("Você deve preencher os campos obrigatórios.");
      return response;
    }

    const postSlug = title
                    .toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

    let coverImageUrl: string | null = null;
    if (coverImageFile) {
      try {
        coverImageUrl = await uploadToS3(coverImageFile, 'posts/cover-images');
      } catch (s3Error) {
        console.error("Erro no upload da iamgem.", s3Error);
        response = await internalServerError("Erro ao fazer upload da imagem da capa");
        return response
      }
    }

    let tagIds: number[] = [];
    if (tags && tags.length > 0) {
      const newTags = await findOrCreateTagsRepo(tags);
      tagIds = newTags.map(tag => tag.id);
    }

    const postDatatoRepo = {
      title,
      slug: postSlug,
      excerpt,
      content,
      cover_image_url: coverImageUrl,
      authorId,
      categoryId,
      tagIds: tagIds
    };

    const newPost = await createPostRepo(postDatatoRepo);
    response = await created(newPost);
    return response;

  } catch (error) {
    console.error("Erro no createPostService:", error);
    response = await internalServerError("Aconteceu algum erro no servidor ao criar o post.");
    return response;
  }
}

export { createPostService }