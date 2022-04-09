const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
    {
        title: { type: String },
        description: { type: String },
        date: { type: Date },
        idPhoto: { type: String },
        created: { type: String },
        class: { type: String },
user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);

module.exports = mongoose.model("Course", CourseSchema);
