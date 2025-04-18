import { ObjectCannedACL, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export const uploadToS3 = async (file: Express.Multer.File): Promise<string> => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME!, // obrigatoriamente o nome do bucket
      Key: `users/profile-pictures/${Date.now()}-${file.originalname}`, // caminho do arquivo no S3
      Body: file.buffer, // conteudo do arquivo
      ContentType: file.mimetype, // tipo do arquivo
      ACL: ObjectCannedACL.public_read, // faz com que seja de acesso publico
    };

    const s3Client = new S3Client([{
      region: process.env.AWS_REGION,

      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }
    }]);

    await s3Client.send(
      new PutObjectCommand(params)
    )

    const url: string = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`
    return url
} catch (error) {
  console.log(error);
  return `${error}`
}};