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
  let commantaireID = req.body.commantaireID;
  Commantaire.findById(commantaireID)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured",
      });
    });
};
const add = (req, res, next) => {
  const { commantaire, user } = req.body;

  const newCommantaire = new Commantaire();

  newCommantaire.commantaire = commantaire;
  newCommantaire.user = user;
  newCommantaire.save();

  res.status(201).send({ commantaire: "success", commantaire: newCommantaire });
};
const update = async (req, res, next) => {
  const commantaireID = req.body.commantaireID;
  try {
    const c = await Commantaire.findOne({ _id: commantaire });
    console.log(commantaire);
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

module.exports = {
  index,
  show,
  add,
  update,
  destroy,
};
