const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
    {
        title: { type: String },
        description: { type: String },
        date: { type: Date },
        idPhoto: { type: String },
        created: { type: String },
        class:  {
            type:Array,
            
            
          },
        user : {type:String}
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);

module.exports = mongoose.model("Course", CourseSchema);
