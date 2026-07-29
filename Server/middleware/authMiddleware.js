import admin from "../config/firebase.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("VERIFY TOKEN ERROR:");
    console.log(error.code);
    console.log(error.message);
    console.log(error);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export default authMiddleware;