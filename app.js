const express = require('express')
const config = require('config')
const path = require('path')
const DbDriverMemory = require('./database/dbdriver-memory');

const dbDriver = new DbDriverMemory();
/*
let PLAYERS = [
    {id: v4(), name: ''}
];

let TEAMS = [
    {id: v4(), name: '', players:[]}
];

let GAMES = [
    {id: v4(), home: '', away: '', goalsHome: [], goalsAway: []}
];

let GOALS = [
    {id: v4(), game: '', player: ''}
];
*/

const app = express()

const PORT = config.get('port') || 5900;

app.use(express.json({ extended: true }))
//CORS middleware
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    next();
};

app.use(allowCrossDomain);

// GET
app.get('/api/players', (req, res) => {
    res.status(200).json(dbDriver.getPlayers());
})

app.get('/api/teams', (req, res) => {
    res.status(200).json(dbDriver.getTeams());
})

app.get('/api/games', (req, res) => {
    res.status(200).json(dbDriver.getGames());
})

app.get('/api/dashboard', (req, res) => {
    res.status(200).json(dbDriver.getDashboard());
})

app.use('/', express.static(path.join(__dirname, 'client/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/dist', 'index.html'))
})

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))

