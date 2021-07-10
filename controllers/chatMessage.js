const Team = require("../models/teams.js");
const User = require("../models/user.js");

const chatMessage = async (req, res) => {
  const { teamId, name, message } = req.body;

  try {
    const existingTeam = await Team.findOne({ teamId });

    if (!existingTeam)
      return res.status(400).json({ message: "Team doesn't exist" });
    var arr = existingTeam.chat;

    arr.push({
      sender: name,
      message: message,
    });

    const obj = {
      chat: arr,
    };

    const result = await Team.findOneAndUpdate(
      { teamId },
      { $set: obj },
      { upsert: true, new: true }
    );
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " });
    console.log(error);
  }
};

module.exports.chatMessage = chatMessage;
