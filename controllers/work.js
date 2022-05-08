
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
const findbystudentandhomework = async (req, res, next) => {
    let idhomework = req.body.idhomework
    let idstudent = req.body.idstudent
    try {
        const homeworks = await Work.find({
            idcourse : idhomework,
            idstudent:idstudent

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
                  const { exercice , idstudent  , idhomework,pdfexercicename } = req.body;
                  console.log( req.file.path)
            const newWork = new Work();
           
            newWork.exercice = exercice;
            newWork.idstudent = idstudent;
          
            newWork.idcourse = idhomework;
            
            newWork.rendu =  req.file.path;
            console.log(newWork)
            newWork.save();
            console.log(newWork)
            res.status(201).send({ success: "success", work: newWork });
             } catch (error) {
                res.status(404).send({ success: false, work: "error" });
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
    index, show, add, update, destroy,fileup,findbystudentandhomework
}