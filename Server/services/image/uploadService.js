import cloudinary from "../../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadImage = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary Upload Error:", error);
          return reject(error);
        }

        console.log(`☁️ Uploaded to ${folder}`);

        resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};
