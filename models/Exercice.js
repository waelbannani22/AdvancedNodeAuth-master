var mongoose = require('mongoose')

var Exerciceschema = new mongoose.Schema({
        exercice: {
                type: String
        },
        description: {
                type: String
        },
        date: {
                type: String
        },
        pdfexcercicename: {
                type: String
        },
        course: {
                type:String
        }



}, { timestamps: true })

module.exports = mongoose.model("Exercice", Exerciceschema)