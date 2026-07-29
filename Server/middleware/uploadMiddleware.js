import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed."));
    }

    cb(null, true);
  },
});

export default upload;
