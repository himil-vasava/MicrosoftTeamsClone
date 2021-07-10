const Team = require("../models/teams.js");
const User = require("../models/user.js");

const getChat = async (req, res) => {
  const { teamId, pageNumber } = req.body;

  try {
    const team = await Team.findOne({ teamId });
    console.log(teamId);

    if (!team) return res.status(400).json({ message: "Team doesn't exist" });

    const result = await Team.findOne({ teamId });

    arr = result.chat;

    res.status(200).json({ result: arr });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " });
    console.log(error);
  }
};

module.exports.getChat = getChat;
