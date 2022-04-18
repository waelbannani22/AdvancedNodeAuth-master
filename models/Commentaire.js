const mongoose = require("mongoose");

const CommantaireSchema = new mongoose.Schema(
    {
        commantaire: { type: String },
        user: {
            type: String
        },
        lesson : {
            type : String
        },
        created:{
            type : String
        }
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);

module.exports = mongoose.model("Commantaire", CommantaireSchema);
