const DbDriver = require('./dbdriver-base');
const {v4} = require('uuid')

const timeout = (data) => {return new Promise((resolve => {setTimeout(()=>{resolve(data)}, 300)}))};

class DbDriverMemory extends DbDriver {
    PLAYERS = [
        {
            id: '1',
            name: 'Thomas',
            surname: 'Partey',
            team: '1' // 'Bern'
        },
        {
            id: '2',
            name: 'Robert',
            surname: 'Lewandovski',
            team: '1' // 'Bern'
        },
        {
            id: '3',
            name: 'Lionel',
            surname: 'Messi',
            team: '2' // 'Zurich'
        },
        {
            id: '4',
            name: 'Cristiano',
            surname: 'Ronaldo',
            team: '5' // 'Geneva'
        },
        {
            id: '5',
            name: 'Kylian',
            surname: 'Lottin',
            team: '3' // 'Basel'
        },
        {
            id: '6',
            name: 'Bruno',
            surname: 'Fernandes',
            team: '7' // 'Luzern'
        },
        {
            id: '7',
            name: 'Erlin',
            surname: 'Haaland',
            team: '8' // 'Chur'
        },
        {
            id: '8',
            name: 'Ciro',
            surname: 'Immobile',
            team: '5' // 'Geneva'
        },
    ];

    TEAMS = [
        {
            id: '1',
            name: 'Bern'
        },
        {
            id: '2',
            name: 'Zurich'
        },
        {
            id: '3',
            name: 'Basel'
        },
        {
            id: '5',
            name: 'Geneva'
        },
        {
            id: '6',
            name: 'Friburg'
        },
        {
            id: '7',
            name: 'Luzern',
        },
        {
            id: '8',
            name: 'Chur'
        },
    ];

    GAMES = [
        {
            id: '1',
            home: {name: 'Bern', id: '1'},
            away: {name: 'Zurich', id: '2'},
            result: '3:1'
        },
        {
            id: '2',
            home: {name: 'Basel', id: '3'},
            away: {name: 'Bern', id: '1'},
            result: '2:3'
        },
        {
            id: '3',
            home: {name: 'Geneva', id: '5'},
            away: {name: 'Friburg', id: '6'},
            result: '1:0'
        },
        {
            id: '4',
            home: {name: 'Luzern', id: '7'},
            away: {name: 'Chur', id: '8'},
            result: '1:1'
        }
    ];

    DASHBOARD = [
        {
            id: '1',
            name: 'Bern',
            wins: 10,
            loses: 2,
            ratio: 10 / 2,
            goals: 15,
            lose: 10,
            diff: 15 - 10
        },
        {
            id: '2',
            name: 'Zurich',
            wins: 5,
            loses: 7,
            ratio: 5 / 7,
            goals: 8,
            lose: 12,
            diff: 8 - 12
        },
        {
            id: '3',
            name: 'Basel',
            wins: 6,
            loses: 6,
            ratio: 6 / 6,
            goals: 10,
            lose: 12,
            diff: 10 - 12
        },
        {
            id: '4',
            name: 'Geneva',
            wins: 7,
            loses: 6,
            ratio: 7 / 6,
            goals: 14,
            lose: 12,
            diff: 14 - 12
        },
    ];

    GOALS = [
        /*{
            id: '1',
            game: '1',
            player: '1',
            team: '1',
            favor: '1'
        }*/
    ]

    async getPlayers() {
        return timeout(this.PLAYERS);
    }

    getTeams() {
        return timeout(this.TEAMS);
    }

    makeGame(game) {
        const gameGoals = this.GOALS.filter( goal => goal.game === game.id);
        console.log(gameGoals)
        if (gameGoals.length > 0) {
            const home = gameGoals.filter(goal => goal.favor === game.home.id);
            const away = gameGoals.filter(goal => goal.favor === game.away.id);
            game.result = `${home.length}:${away.length}`;
            game['goals'] = {home, away};
        }
        return game;
    }

    getGames() {
        const games = this.GAMES.map(game => {
            return this.makeGame(game);
        });
        return timeout(games);
    }

    getDashboard() {
        return timeout(this.DASHBOARD);
    }

    getGame(id) {
        const game = this.makeGame(this.GAMES.find(item => item.id === id));
        return timeout(game);
    }

    addPlayer(player) {
        player['id'] = v4();
        console.log(player);
        const check = this.PLAYERS.find((item) => item.name.toLowerCase() === player.name.toLowerCase()
            && item.surname.toLowerCase() === player.surname.toLowerCase());
        if (check) {
            return timeout(null);
        }
        this.PLAYERS.push(player);
        return timeout(player);
    }

    addTeam(team) {
        team['id'] = v4();
        console.log(team);
        const check = this.TEAMS.find((item) => item.name.toLowerCase() === team.name.toLowerCase());
        if (check) {
            return timeout(null);
        }
        this.TEAMS.push(team);
        return timeout(team);
    }

    addGame(game) {
        game['id'] = v4();
        console.log(game);
        this.GAMES.push(game);
        return timeout(game);
    }

    addGoal(goal) {
        goal['id'] = v4();
        console.log('Goal ' + JSON.stringify(goal));
        this.GOALS.push(goal);
        return timeout(goal);
    }

    deletePlayer(id) {
        const oldLen = this.PLAYERS.length;
        this.PLAYERS = this.PLAYERS.filter(c => c.id !== id)
        return timeout(oldLen > this.PLAYERS.length);
    }

    deleteTeam(id) {
        const oldLen = this.TEAMS.length;
        this.TEAMS = this.TEAMS.filter(c => c.id !== id)
        return timeout(oldLen > this.TEAMS.length);
    }

    updatePlayer(player) {
        console.log('EDIT player: ' + JSON.stringify(player));
        const idx = this.PLAYERS.findIndex(c => c.id === player.id);
        if (idx >= 0) {
            this.PLAYERS[idx] = player;
            return timeout(player);
        }
        return timeout(null);
    }

    updateTeam(team) {
        console.log('EDIT team: ' + JSON.stringify(team));
        const idx = this.TEAMS.findIndex(c => c.id === team.id);
        if (idx >= 0) {
            this.TEAMS[idx] = team;
            return timeout(team);
        }
        return timeout(null);
    }

    updateGame(game) {
        console.log('EDIT game: ' + JSON.stringify(game));
        const idx = this.GAMES.findIndex(c => c.id === game.id);
        if (idx >= 0) {
            this.GAMES[idx] = game;
            return timeout(game);
        }
        return timeout(null);
    }
}

module.exports = DbDriverMemory;
