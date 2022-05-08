var mongoose = require('mongoose')

var Workschema = new mongoose.Schema({
        exercice: {
                type: String
        },
        idstudent: {
            type: String
        },
        idcourse: {
            type: String
        },
        rendu: {
                type: String
        }



}, { timestamps: true })

module.exports = mongoose.model("work", Workschema)