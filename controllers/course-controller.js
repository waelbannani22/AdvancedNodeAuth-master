let Course = require("../models/Course")
const index = (req, res, next) => {
    Course.find()
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
const show = (req, res, next) => {
    let courID = req.body.courID
    Cour.findById(courID)
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
    const { title , description, user } = req.body;

    const newCourse = new Course();
    
    newCourse.title = title;
    newCourse.description = description;
    newCourse.idPhoto = req.file.path;
    newCourse.user = user;
    newCourse.save();

    res.status(201).send({ course: "success", course: newCourse });
   
}
const update = async(req, res, next) => {
    const courseID=req.body.courseID
    try {
        const c = await Course.findOne({_id: courseID})
        console.log(courseID)
        c.title = req.body.title
        c.description = req.body.description

       await  c.save()
       res.status(200).json({success : true,message: "updated successeuflly"})
    } catch (error) {
        res.status(400).json({success : false,message: "error"})
    }

}
const destroy =(req, res, next) =>{
    let courseID = req.body.courseID
    Course.findByIdAndDelete(courseID)
    .then(() => {
        res.json({
            message:'courses deleted successfully!'
        })
    })
    .catch (error => {
        res.json({
            messaage:'An error Occured'
        })
    })
}

module.exports = {
    index, show, add, update, destroy
}