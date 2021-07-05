const express = require('express');

const team  = require('../controllers/team.js');
const join = require('../controllers/joinTeam.js');
const teams = require('../controllers/getTeam.js');
const message = require('../controllers/chatMessage.js');

const createTeam = team.createTeam;
const joinTeam = join.joinTeam;
const getTeam = teams.getTeam;
const chatMessage = message.chatMessage;

const router = express.Router();

router.post('/createTeam', createTeam);
router.post('/joinTeam', joinTeam);
router.post('/getTeam', getTeam);
router.post('/chatMessage', chatMessage);

module.exports = router;
