import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const uploadToS3 = async (file: Express.Multer.File): Promise<string> => {
  try {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME!, 
      Key: `users/profile-pictures/${Date.now()}-${file.originalname}`, 
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read', 
    };

    const uploadedImage = await s3.upload(params).promise();
    return uploadedImage.Location;
  } catch (error) {
    console.error('Erro ao enviar imagem para o S3:', error);
    throw error;
  }
};