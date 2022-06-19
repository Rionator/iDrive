const { mongoose } = require("mongoose");
const Grid = require("gridfs-stream");
const { ObjectId } = require("bson");
const url = process.env.MONGO_URL;
const connect = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs, gridfsBucket;
connect.once("open", () => {
  gfs = Grid(connect.db, mongoose.mongo);
  gfs.collection("uploads");
  gridfsBucket = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "uploads",
  });
});

exports.createFile = async (req, res) => {
  try {
    if (req.file === undefined || !req.file || req.file.length === 0) {
      return res.status(400).send({
        message: "You must select a file.",
      });
    }
    return res.send({
      message: "File has been uploaded to Mongodb.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Error when trying to upload file: ${error}`,
    });
  }
};

exports.getFileById = (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.id)) {
      gfs.files.findOne({ _id: ObjectId(req.params.id) }, (err, file) => {
        if (!file || file.length === 0) {
          return res.status(404).send({ message: "This file doesn't exist" });
        } else {
          return res.status(200).send(file);
        }
      });
    } else {
      return res.status(400).send({ message: "Wrong id" });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

exports.getUserFiles = async (req, res) => {
  try {
    const userJWT = req.user;
    const files = await gfs.files
      .find({ "metadata.owner_id": userJWT._id })
      .toArray();
    if (!files || files === undefined || files.length === 0) {
      res.sendStatus(204);
    } else {
      res.status(200).json(files);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot get files : " + error });
  }
};

exports.downloadFileById = (req, res) => {
  if (req.params.id === undefined) {
    return res.status(400).send({ message: "You sent an empty params..." });
  }
  try {
    var readstream = gridfsBucket.openDownloadStream(ObjectId(req.params.id));
    readstream.on("error", (err) => {
      // report stream error
      console.log(err);
    });
    readstream.pipe(res);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.getUserFileCount = async (req, res) => {
  try {
    const userJWT = req.user;
    const files = await gfs.files
      .find({ "metadata.owner_id": userJWT._id })
      .toArray();
    res.status(200).send(files.length);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot get files : " + error });
  }
};

// delete file

exports.deleteFileById = async (req, res) => {
  try {
    if (mongoose.isValidObjectId(req.params.id)) {
      await gridfsBucket.delete(ObjectId(req.params.id), (err, file) => {
        if (err) {
          return res
            .status(404)
            .send({ message: "File not found, couldn't delete" });
        } else {
          return res.send({ message: "File deleted successfuly" });
        }
      });
    } else {
      return res.status(400).send({ message: "Wrong id" });
    }
  } catch (error) {
    return res.status(500).send({
      message: error.message,
    });
  }
};

exports.deleteUserDocuments = async (req, res, next) => {
  try {
    const userJWT = req.user;
    if (!userJWT.isAdmin) {
      const files = await gfs.files
        .find({ "metadata.owner_id": userJWT._id })
        .toArray();
      if (!files || files === undefined || files.length === 0) {
        res.status(400).json({ message: "Remove failure, no files." });
      } else {
        files.forEach((item) => {
          gfsBucket.delete(ObjectId(item._id), (error) => {
            if (error) {
              res.status(404).json({ message: "Remove failure. : " + error });
            }
          });
        });
      }
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "File : cannot delete file : " + error });
  }
};

exports.AdminDeleteUserDocumentsById = async (req, res, next) => {
  try {
    const userJWT = req.user;
    const files = await gfs.files
      .find({ "metadata.owner_id": req.params.userId })
      .toArray();
    if (userJWT.isAdmin) {
      if (files) {
        files.forEach((item) => {
          gfsBucket.delete(ObjectId(item._id), (error) => {
            if (error) {
              res
                .status(404)
                .json({ message: "Failed to remove file : " + error });
            }
          });
        });
        next();
      }
    } else {
      res.status(401).json({
        message: "Cannot delete file : You must be an administrator.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "File : cannot delete file : " + error });
  }
};
