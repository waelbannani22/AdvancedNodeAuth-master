const mongoose = require("mongoose");

const CommantaireSchema = new mongoose.Schema(
    {
        commantaire: { type: String },      
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);

module.exports = mongoose.model("Commantaire", CommantaireSchema);
