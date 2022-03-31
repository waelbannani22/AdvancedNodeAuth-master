
const Work = require('../models/Work')
const index = (req, res, next) => {
  Work.find()
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
    let workID = req.body.workID
    Work.findById(workID)
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
                  const { exercice , description  , date,pdfexercicename } = req.body;
            
            const newWork = new Work();
           
            newWork.exercice = exercice;
            newWork.description = description;
          
            newWork.date = date;
            
            newWork.pdfexercicename = pdfexercicename;
            
            newWork.save();
            console.log(newWork)
            res.status(201).send({ success: "success", work: newWork });
             } catch (error) {
                res.status(400).send({ success: false, work: "error" });
             }
           
          
   
}
const update = (req, res, next) => {
    let workID = req.body.workID

    let updatedData = {
        exercice: req.body.exercice,
        description: req.body.description,
        date: req.body.date,
        pdf: req.body.pdf,
        pdfexercicename: req.body.pdfexercicename,
         _id: req.body._id

    }
    Work.findOneAndUpdate(workID, {$set: updatedData})
    .then(() => {
        res.json({
            message:'work updated successfully!'
        })
    })
.catch(error => {
    res.json({
        message:'An error Occured!'
    })
})

}
const destroy =(req, res, next) =>{
    let workID = req.body.workID
    Work.findByIdAndDelete(workID)
    .then(() => {
        res.json({
            message:'work deleted successfully!'
        })
    })
    .catch (error => {
        res.json({
            messaage:'An error Occured'
        })
    })
}

module.exports = {
    index, show, add, update, destroy,fileup
}