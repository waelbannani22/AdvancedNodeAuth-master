
const Exercice = require('../models/Exercice')
const index = (req, res, next) => {
    Exercice.find()
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
const fileup=(req,res,next)=>
{
var file = req.files.file
file.mv('./uploads/' + file.name, function(err, result) {
 if(err) 
  throw err;
 res.send({
  success: true,
  message: "File uploaded!"
 });
})
}
const show = (req, res, next) => {
    let exerciceID = req.body.exerciceID
    Exercice.findById(exerciceID)
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
const findbycourse = async (req, res, next) => {
    let courseid = req.body.courseid
    try {
        const homeworks = await Exercice.find({
            course : courseid

        }) ;
        if (homeworks){
             return res.status(200).json({success:true,data:homeworks})
        }else{
            return  res.status(403).json({success:false,data:null})
        }
    } catch (error) {
        next(error)
    }

    
}
const add = (req, res, next) => {
             try {
                  const { exercice,description,date,pdfexcercicename,course } = req.body;
            
            const newExercice = new Exercice();
           
            newExercice.exercice = exercice;
            newExercice.description = description;
            newExercice.course =  course
            newExercice.date = date;

            newExercice.pdfexcercicename = req.file.path;

            
            
            newExercice.save();
            console.log(newExercice)
            res.status(201).send({ success: "success", exercice: newExercice });
             } catch (error) {
                res.status(400).send({ success: false, exercice: "error" });
             }
           
          
   
}
const update = (req, res, next) => {
    let exerciceID = req.body.exerciceID

    let updatedData = {
        name: req.body.name,
        description: req.body.description,
        pdf: req.body.pdf,
        _id: req.body._id

    }
    Exercice.findOneAndUpdate(exerciceID, {$set: updatedData})
    .then(() => {
        res.json({
            message:'Exercices updated successfully!'
        })
    })
.catch(error => {
    res.json({
        message:'An error Occured!'
    })
})

}
const destroy =(req, res, next) =>{
    let exerciceID = req.body.exerciceID
    Exercice.findByIdAndDelete(exerciceID)
    .then(() => {
        res.json({
            message:'Exercices deleted successfully!'
        })
    })
    .catch (error => {
        res.json({
            messaage:'An error Occured'
        })
    })
}

module.exports = {
    index, show, add, update, destroy,fileup,findbycourse
}