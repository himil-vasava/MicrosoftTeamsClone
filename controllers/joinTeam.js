const Team = require("../models/teams.js");
const User = require("../models/user.js");

const joinTeam = async (req, res) => {
  const { teamId, email } = req.body;

  try {
    const existingTeam = await Team.findOne({ teamId });

    if (!existingTeam)
      return res.status(400).json({ message: "Team doesn't exist" });
    var arr = existingTeam.members;

    arr.push(email);

    const obj = {
      members: arr,
    };

    //Update the team in which the user joined by adding to member's array
    const result = await Team.findOneAndUpdate(
      { teamId },
      { $set: obj },
      { upsert: true, new: true }
    );

    const newTeam = await Team.findOne({ teamId });

    const user = await User.findOne({ email });

    var arr2 = user.teams;

    arr2.push(teamId);

    const obj2 = {
      teams: arr2,
    };

    //Update the user and add the team in which he joined
    const result2 = await User.findOneAndUpdate(
      { email },
      { $set: obj2 },
      { upsert: true, new: true }
    );
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " });
    console.log(error);
  }
};

module.exports.joinTeam = joinTeam;
