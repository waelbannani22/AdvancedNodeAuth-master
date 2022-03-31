var mongoose = require('mongoose')

var Workschema = new mongoose.Schema({
        exercice: {
                type: String
        },
        description: {
            type: String
        },
        date: {
            type: String
        },
        pdfexercicename: {
                type: String
        }



}, { timestamps: true })

module.exports = mongoose.model("work", Workschema)