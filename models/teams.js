const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: {type: String, required: true},
    teamId: {type: String, required: true},
    members: [String],
    chat: [
        {
            _id:{
                type: String,
            },
            sender:{
                type: String,
            },
            message:{
                type: String,
            }
        }
    ]
})

module.exports = mongoose.model("Team", teamSchema);