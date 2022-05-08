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
const show = async (req, res, next) => {

    const id = req.body.courseID
    try {
        const cour = await Course.findOne({
            _id: id
        })
        if (cour) {
            res.status(200).json({
                success: true,
                data: cour,
            });
        } else {
            res.status(200).json({
                success: false,
                data: "cours not found",
            });
        }

    } catch (error) {
        next(err);
    }

}
const add = async (req, res, next) => {
    const { classes, title, description, user, created } = req.body;
    try {
        const newCourse = new Course();

        newCourse.title = title;
        newCourse.description = description;
        newCourse.idPhoto = req.file.path;
        newCourse.created = created;
        newCourse.user = user;
        newCourse.class = classes;
        await newCourse.save();

        res.status(201).json({ success: true, data: newCourse });

    } catch (error) {
        next(error)
    }

}
const update = async (req, res, next) => {
    const courseID = req.body.courseID
    try {
        const c = await Course.findOne({ _id: courseID })
        console.log(courseID)
        c.title = req.body.title
        c.description = req.body.description

        await c.save()
        res.status(200).json({ success: true, message: "updated successeuflly" })
    } catch (error) {
        res.status(400).json({ success: false, message: "error" })
    }

}
const destroy = (req, res, next) => {
    let courseID = req.body.courseID
    Course.findByIdAndDelete(courseID)
        .then(() => {
            res.json({
                message: 'courses deleted successfully!'
            })
        })
        .catch(error => {
            res.json({
                messaage: 'An error Occured'
            })
        })
}
const getLessonbyprof = async (req, res, next) => {
    let idTeacher = req.body.idTeacher
    let courseID = req.body.courseID
    try {
        const lessons = await Course.find({
            user: idTeacher
        })
        console.log(lessons)
        res.status(200).json({
            success: true,
            data: lessons,
          });
    } catch (error) {
        next(error)
    }



}
const getLessonbyStudent = async (req, res, next) => {
    let classn = req.body.classn
    let courseID = req.body.courseID
    var b =true
    try {
        const lessons = await Course.find({
          
        })
       // console.log("iii",lessons)
        if ( lessons != ""){
            var resz = lessons
                var size = lessons.length
                // for (i=0;i<size;i++){
                //    // console.log("class",lessons[i].class)
                //     if ( JSON.parse(lessons[i].class).classeName !=classn){
                //             //      console.log("each",JSON.parse(e.class).classeName)
                //             // console.log("class",classn)
                            
                                
                //                 if ( lessons.indexOf(lessons[i])>-1){
                //                          resz.splice(lessons.indexOf(lessons[i]), 1); // 2nd parameter means remove one item only
                                            
                //                         }
                               
                                  
                //                   console.log("res",lessons) 
                                 
                //                 // console.log("res",o) 
                //             }
                // }
               
                lessons.forEach((e)=>{
                    console.log("each",JSON.parse(e.class).classeName)
                    console.log("class",classn)
                    var size = lessons.length -1
                   
                    
                    for(i=0;i<size;i++){
                        console.log("class",lessons[i].class)
                        console.log("i=",i,"size=",size)
                        // if(size-i ==2){
                        //     if ( JSON.parse(lessons[0].class).classeName !=classn){
                        //         //      console.log("each",JSON.parse(e.class).classeName)
                        //         // console.log("class",classn)
                          
                        //         lessons.splice(0, 1); // 2nd parameter means remove one item only
                              
                        //               console.log("res",lessons) 
                                     
                        //             // console.log("res",o) 
                        //         } 
                        // }
                        // if(size-i >2)
                        if ( JSON.parse(lessons[i].class).classeName !=classn){
                    //      console.log("each",JSON.parse(e.class).classeName)
                    // console.log("class",classn)
                    
                    lessons.splice(i, 1); // 2nd parameter means remove one item only
                     
                    size--
                          console.log("res",lessons) 
                         
                        // console.log("res",o) 
                    } 
                    }
                    
              
                })
                console.log("las",lessons[lessons.length -1])
                if ( JSON.parse(lessons[lessons.length -1].class).classeName !=classn ){
                    lessons.splice(lessons.length -1, 1);
                }
                console.log("/////")
               res.status(200).json({
                success: true,
                data: lessons,
              });
         
          
        }else{
          //  console.log(lessons)
            res.status(400).json({
                success: false,
                data: null,
              });
        }
      
    } catch (error) {
        next(error)
    }



}

module.exports = {
    index, show, add, update, destroy,getLessonbyprof,getLessonbyStudent
}