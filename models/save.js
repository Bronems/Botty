const mongoose = require("mongoose");

const { DEFAULTSETTINGS: defaults } = require("../config");
const savedShema = mongoose.Schema({
    guildID: String,
    profilLastTime: Number,
    delayProfil: {
        "type": Number,
        "default": defaults.ProfileDelay
    }
});

module.exports = mongoose.model("Save", savedShema); 