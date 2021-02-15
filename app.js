const express = require('express')
const config = require('config')
const path = require('path')
const {v4} = require('uuid')
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

// GET *******************************
app.get('/api/players', (req, res) => {
    (async ()=>{
        const data = await dbDriver.getPlayers();
        res.status(200).json(data);
    })();
})

app.get('/api/teams', (req, res) => {
    (async ()=>{
        const data = await dbDriver.getTeams();
        res.status(200).json(data);
    })();
})

app.get('/api/games', (req, res) => {
    (async ()=>{
        const data = await dbDriver.getGames();
        res.status(200).json(data);
    })();
})

app.get('/api/dashboard', (req, res) => {
    (async ()=>{
        const data = await dbDriver.getDashboard();
        res.status(200).json(data);
    })();
})

// POST *******************************
app.post('/api/players', (req, res) => {
    (async ()=>{
        console.log(req.body);
        const player = {...req.body, id: v4()}
        const data = await dbDriver.addPlayer(player);
        if (data) {
            res.status(201).json(data);
        } else {
            res.status(422).json(data);
        }
    })();
})

app.post('/api/teams', (req, res) => {
    (async ()=>{
        console.log(req.body);
        const team = {...req.body, id: v4()}
        const data = await dbDriver.addTeam(team);
        if (data) {
            res.status(201).json(data);
        } else {
            res.status(422).json(data);
        }
    })();
})

// DELETE *******************************
app.delete('/api/players/:id', (req, res) => {
    (async ()=>{
        const result = await dbDriver.deletePlayer(req.params.id);
        console.log(`DELETE player [${req.params.id}]: ${result}`);
        res.status(result ? 200 : 404).json(req.params.id);
    })();
})

app.delete('/api/teams/:id', (req, res) => {
    (async ()=>{
        const result = await dbDriver.deleteTeam(req.params.id);
        console.log(`DELETE team [${req.params.id}]: ${result}`);
        res.status(result ? 200 : 404).json(req.params.id);
    })();
})

// PUT *******************************
app.put('/api/players', (req, res) => {
    (async ()=>{
        console.log(req.body);
        const player = {...req.body};
        const data = await dbDriver.updatePlayer(player);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json(data);
        }
    })();
})

app.put('/api/teams', (req, res) => {
    (async ()=>{
        console.log(req.body);
        const team = {...req.body};
        const data = await dbDriver.updateTeam(team);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json(data);
        }
    })();
})

app.use('/', express.static(path.join(__dirname, 'client/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/dist', 'index.html'))
})

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))

