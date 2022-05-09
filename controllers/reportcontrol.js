const Report = require('../models/report')
const add = (req, res, next) => {
    try {
         const { motif , emailStudent  , idteacher,classe } = req.body;
       
   const newWork = new Report();
  
   newWork.idteacher = idteacher;
   newWork.emailS = emailStudent;
 
   newWork.motif = motif;
   
   newWork.class =  classe;
   
   newWork.save();
    
   res.status(201).send({ success: "success", work: newWork });
    } catch (error) {
       res.status(404).send({ success: false, work: "error" });
    }
  
 

    
}

const findall = async (req, res, next) => {
    let idhomework = req.body.idhomework
    let idstudent = req.body.idstudent
    try {
        const homeworks = await Report.find({
         
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

module.exports = {
   findall,add
}