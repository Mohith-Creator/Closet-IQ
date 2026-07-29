import { uploadImage } from "./uploadService.js";

// -----------------------------------------------------------------------------
// Upload Original Image
// -----------------------------------------------------------------------------

export const uploadOriginalImage = async (buffer) => {
  console.log("☁️ Uploading image...");

  const upload = await uploadImage(buffer, "closetiq-items");

  console.log("✅ Image uploaded.");

  return {
    originalImage: upload.secure_url,
    originalPublicId: upload.public_id,
  };
};

// -----------------------------------------------------------------------------
// Process Image
// For v1.0 we no longer remove the background.
// We simply upload the original image and reuse it everywhere.
// -----------------------------------------------------------------------------

export const processImage = async (buffer) => {
  console.log("🖼️ Uploading image...");

  const original = await uploadOriginalImage(buffer);

  return {
    originalImage: original.originalImage,
    originalPublicId: original.originalPublicId,

    // Reuse original image
    processedImage: original.originalImage,
    processedPublicId: original.originalPublicId,
  };
};
