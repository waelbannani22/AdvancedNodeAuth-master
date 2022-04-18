const Commentaire = require("../models/Commentaire");
let Commantaire = require("../models/Commentaire");
const index = (req, res, next) => {
  Commantaire.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
      });
    });
};
const show = (req, res, next) => {
  let teachers = req.body.teachers;
  try {
    const commantaires = Commentaire.find({
      
    })
    res.status(200).json({
      success: true,
      data: commantaires,
    });
  } catch (error) {
    next(error)
  }
};
const add = (req, res, next) => {
  const { commantaire, user,lesson ,created} = req.body;

  const newCommantaire = new Commantaire();
  newCommantaire.lesson = lesson;
  newCommantaire.commantaire = commantaire;
  newCommantaire.created = created;
  newCommantaire.user = user;
  newCommantaire.save();

  res.status(201).send({ commantaire: "success", commantaire: newCommantaire });
};

const update = async (req, res, next) => {
  const commantaireID = req.body.commantaireID;
  try {
    const c = await Commantaire.findOne({ _id: commantaireID });
    
    c.commantaire = req.body.commantaire;

    await c.save();
    res.status(200).json({ success: true, message: "updated successeuflly" });
  } catch (error) {
    res.status(400).json({ success: false, message: "error" });
  }
};
const destroy = (req, res, next) => {
  let commantaireID = req.body.commantaireID;
  Commantaire.findByIdAndDelete(commantaireID)
    .then(() => {
      res.json({
        message: "Commantaire deleted successfully!",
      });
    })
    .catch((error) => {
      res.json({
        messaage: "An error Occured",
      });
    });
};
const findbyLessons = async (req, res, next) => {
  let lessons = req.body.lessons;
  try {
    const commantaires = await Commentaire.find({
      lesson : lessons
    })
    res.status(200).json({
      success: true,
      data: commantaires,
    });
  } catch (error) {
    next(error)
  }
};
module.exports = {
  index,
  show,
  add,
  update,
  destroy,
  findbyLessons
};
