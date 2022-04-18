
const ressource = require('../models/ressource')
const Resource = require('../models/ressource')
const index = (req, res, next) => {
    Resource.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })
}
const fileup = (req, res, next) => {
    var file = req.files.file
    if (file !== null) {

        file.mv('./uploads/' + file.name, function (err, result) {
            if (err)
                throw err;
            res.send({
                success: true,
                message: "File uploaded!"
            });
        })
    } else {
        res.send({
            success: false,
            message: "File not uploaded!!!!"
        });
    }

}
const show = (req, res, next) => {
    let resourceID = req.body.resourceID
    Resource.findById(resourceID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured'

            })
        })
}
const add = (req, res, next) => {
    try {
        const { name, description, course, pdfname } = req.body;

        const newResource = new Resource();

        newResource.name = name;
        newResource.description = description;

        newResource.pdfname = req.file.path;

        newResource.course = course;

        newResource.save();
        console.log(newResource)
        res.status(201).send({ success: "success", resource: newResource });
    } catch (error) {
        res.status(400).send({ success: false, resource: "error" });
    }



}
const update = (req, res, next) => {
    let resourceID = req.body.resourceID

    let updatedData = {
        name: req.body.name,
        description: req.body.description,
        pdf: req.body.pdf,
        _id: req.body._id

    }
    Resource.findOneAndUpdate(resourceID, { $set: updatedData })
        .then(() => {
            res.json({
                message: 'resources updated successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })

}
const destroy = (req, res, next) => {
    let resourceID = req.body.resourceID
    Resource.findByIdAndDelete(resourceID)
        .then(() => {
            res.json({
                message: 'resources deleted successfully!'
            })
        })
        .catch(error => {
            res.json({
                messaage: 'An error Occured'
            })
        })
}
const findbyLesson = async (req, res, next) => {
    let lesson = req.body.lesson
    try {
        const ress = await ressource.find({
            course : lesson
        })
        res.status(200).json({
            success: true,
            data: ress,
          });
    } catch (error) {
        next(error)
        
    }
}

module.exports = {
    index, show, add, update, destroy, fileup,findbyLesson
}