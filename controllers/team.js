const Team = require('../models/teams.js');
const User = require('../models/user.js');

const createTeam = async (req, res) => {
    const {id, teamName, array, email} = req.body;

    try{
        const existingTeam = await Team.findOne({teamId: id});

        if(existingTeam) return res.status(400).json({message: "Team already exists "});

        //const result = await Team.create({id, teamName});
        const team = new Team({
            name:teamName,
            teamId:id,
            members: array
        });
        const result = await team.save();
        //console.log(result);

        const user = await User.findOne({email});

        if(!user) return res.status(400).json({message: "User doesn't exist"});
        var arr2 = user.teams;

        arr2.push(id);

        const obj2 = {
            teams: arr2
        }

        const result2 = await User.findOneAndUpdate({email}, {$set: obj2}, {upsert:true, new: true});
    }catch(error){
        res.status(500).json({message: "Something went wrong "});
        //console.log(error);
    }
}

module.exports.createTeam = createTeam;