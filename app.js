const express = require('express')
const config = require('config')
const path = require('path')
const DbDriverMemory = require('./database/dbdriver-memory');
const DbDriverMySQL = require('./database/dbdriver-mysql');

const dbDriver = config.get('db') === 'mysql' ? new DbDriverMySQL(config.get('mysql')) : new DbDriverMemory();

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

app.get('/api/players/history/:id', (req, res) => {
    (async ()=>{
        const data = await dbDriver.getPlayerHistory(req.params.id);
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

app.get('/api/games/:id', (req, res) => {
    (async ()=>{
        const data = await dbDriver.getGame(req.params.id);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json('{}');
        }
    })();
})

app.get('/api/dashboard', (req, res) => {
    (async ()=>{
        const data = await dbDriver.getDashboard();
        res.status(200).json(data);
    })();
})

function addObject(res, type, obj) {
    (async ()=>{
        console.log(obj);
        let data;
        switch (type) {
            case 'player':
                data = await dbDriver.addPlayer(obj);
                break;
            case 'team':
                data = await dbDriver.addTeam(obj);
                break;
            case 'game':
                data = await dbDriver.addGame(obj);
                break;
            case 'goal':
                data = await dbDriver.addGoal(obj);
                break;
        }
        if (data) {
            res.status(201).json(data);
        } else {
            res.status(422).json(data);
        }
    })();
}

function updateObject(res, type, obj) {
    (async ()=>{
        console.log(obj);
        let data;
        switch (type) {
            case 'player':
                data = await dbDriver.updatePlayer(obj);
                break;
            case 'team':
                data = await dbDriver.updateTeam(obj);
                break;
        }
        // const data = await dbDriver.updatePlayer(player);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json(data);
        }
    })();

}
// POST *******************************
app.post('/api/players', (req, res) => {
    addObject(res, 'player', req.body);
})

app.post('/api/teams', (req, res) => {
    addObject(res, 'team', req.body);
})

app.post('/api/games', (req, res) => {
    addObject(res, 'game', req.body);
})

app.post('/api/goals', (req, res) => {
    addObject(res, 'goal', req.body);
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
    updateObject(res, 'player', req.body);
})

app.put('/api/teams', (req, res) => {
    updateObject(res, 'team', req.body);
});

app.use('/', express.static(path.join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/dist', 'index.html'));
});

(async () => {
    await dbDriver.init();
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
})();


