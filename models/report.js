var mongoose = require('mongoose')

var Workschema = new mongoose.Schema({
        idteacher: {
                type: String
        },
        emailS: {
            type: String
        },
        motif: {
            type: String
        },
        class: {
                type: String
        }



}, { timestamps: true })

module.exports = mongoose.model("Report", Workschema)