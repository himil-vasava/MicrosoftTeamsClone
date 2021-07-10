const Team = require("../models/teams.js");
const User = require("../models/user.js");

const getTeam = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User doesn't exist" });

    var arr = user.teams;

    var result = [];

    for await (const team of arr) {
      var requiredTeam = await Team.findOne({ teamId: team });
      result.push(requiredTeam);
    }

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " });
    console.log(error);
  }
};

module.exports.getTeam = getTeam;
