import { uploadToS3 } from "../../config/aws-sdk-config";
import { HttpResponse } from "../../models/http-response-models";
import { UpdateUserData } from "../../models/UpdateUserData";
import { updateUserRepo } from "../../repositories/userRepositories/updateUserRepo";
import { badRequest, internalServerError, ok } from "../../utils/http-helper";


const updateUserService = async (id: number, name?: string, bio?: string, profilePicture?: Express.Multer.File | undefined):Promise<HttpResponse> => {

  let response: HttpResponse | null = null;

  try {

    if (isNaN(id) || id < 0) {
      response = await badRequest("Please, send an information to update the user or verify the user ID.");
      return response;
    }

    let data: UpdateUserData = {};

    if (!name) data.name = name;
    if (!bio) data.bio = bio;

    if (profilePicture) {
      const profilePictureUrl = await uploadToS3(profilePicture, 'users/profile-pictures/')
      data.profile_picture_url = profilePictureUrl
    }
    
    const updatedUser = await updateUserRepo(id, data);
    response = await ok(updatedUser);
    return response;

  } catch (error) {
    console.error("Erro in service", error);
    response = await internalServerError("There's an issue in our server, please try again.");
    return response;
  }
}

export { updateUserService };