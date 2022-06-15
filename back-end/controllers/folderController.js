const Folderdb = require("../models/folderModel.js");

exports.createFolder = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }

    // const {name, parentId, userId, path} = req.body

    const folder = new Folderdb({
        name: req.body.name,
        parentId: req.body.parentId,
        userId: req.body.userId,
        path: req.body.path,
    });

    folder.save(folder).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured while adding new folder",
        })
    })
}
exports.getFolderById = async (req, res) => {
    Folderdb.findById(req.params.id).then(folder => res.send(folder)).catch(err => {
        res.status(500).send({ message: err.message || "Some error occured while retriving folder information" })
    })
}
exports.getUserFolders = async (req, res) => {
    try {
        const userJWT = req.user;
        const folder = Folderdb.find({ "userId": userJWT._id }).toArray();
        if (!folder || folder === undefined || folder.length === 0) {
            res.sendStatus(204);
        } else {
            res.status(200).json(folder);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Cannot get folders : " + error });
    }

}
exports.deleteFolderById = async (req, res) => {

}