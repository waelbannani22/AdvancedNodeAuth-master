var mongoose = require('mongoose')

var resourceschema = new mongoose.Schema({
        name: {
                type: String
        },
        description: {
            type: String
        },
        pdfname: {
                type: String
        },
        course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            }



}, { timestamps: true })

module.exports = mongoose.model("resource", resourceschema)