const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const jwt = require("./jwt");
const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    const userJWT = req.user;
    console.log(req.user);
    return new Promise((resolve, reject) => {
      const fileInfo = {
        metadata: { owner_id: userJWT._id },
        filename: file.originalname,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});
const upload = multer({ storage });

module.exports = { upload };
