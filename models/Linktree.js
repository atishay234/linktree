const mongoose = require("mongoose");

const linktreeSchema = mongoose.Schema({
    tree: [
        {
            text: {
                type: String,
                require: true,
            },
            url: {
                type: String,
                require: true,
            },
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Linktree", linktreeSchema);
