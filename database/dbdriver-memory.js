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
        {
            id: '9',
            name: 'Dusan',
            surname: 'Tadic',
            team: '6' // 'Friburg'
        },
        {
            id: '10',
            name: 'Harry',
            surname: 'Kane',
            team: '3' // 'Basel'
        },
        {
            id: '11',
            name: 'Pizzi',
            surname: '',
            team: '3' // 'Basel'
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
            name: 'Fribourg'
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
            // result: '3:1'
        },
        {
            id: '2',
            home: {name: 'Basel', id: '3'},
            away: {name: 'Bern', id: '1'},
            // result: '2:3'
        },
        {
            id: '3',
            home: {name: 'Geneva', id: '5'},
            away: {name: 'Friburg', id: '6'},
            // result: '1:0'
        },
        {
            id: '4',
            home: {name: 'Luzern', id: '7'},
            away: {name: 'Chur', id: '8'},
            // result: '1:1'
        }
    ];

    GOALS = [
        {
            id: '1',
            game: '1',
            player: '1',
            team: '1',
            favor: '1',
            tm: 1000
        },
        {
            id: '2',
            game: '1',
            player: '2',
            team: '1',
            favor: '1',
            tm: 1100
        },
        {
            id: '3',
            game: '1',
            player: '3',
            team: '2',
            favor: '2',
            tm: 1200
        },
        {
            id: '4',
            game: '1',
            player: '1',
            team: '1',
            favor: '1',
            tm: 1250
        },
        {
            id: '5',
            game: '2',
            player: '1',
            team: '1',
            favor: '1',
            tm: 1300
        },
        {
            id: '6',
            game: '2',
            player: '1',
            team: '1',
            favor: '1',
            tm: 1400
        },
        {
            id: '7',
            game: '2',
            player: '2',
            team: '1',
            favor: '1',
            tm: 1500
        },
        {
            id: '8',
            game: '2',
            player: '11',
            team: '3',
            favor: '3',
            tm: 1600
        },
        {
            id: '9',
            game: '2',
            player: '10',
            team: '3',
            favor: '3',
            tm: 1700
        },
        {
            id: '10',
            game: '3',
            player: '8',
            team: '5',
            favor: '5',
            tm: 2000
        },
        {
            id: '11',
            game: '4',
            player: '6',
            team: '7',
            favor: '7',
            tm: 3000
        },
        {
            id: '12',
            game: '4',
            player: '7',
            team: '8',
            favor: '8',
            tm: 3500
        },
    ]

    async init() {
        return timeout(null);
    }

    async getPlayers() {
        const players = this.PLAYERS.map(player => {
            player['goals'] = this.GOALS.filter(goal => goal.player === player.id && goal.team === goal.favor);
            return player;
        });
        return timeout(players);
    }

    getTeams() {
        return timeout(this.TEAMS);
    }

    makeGame(game) {
        game.result = '0:0';
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
        // return timeout(this.DASHBOARD);
        const teams = this.TEAMS.map( team => {
            const games = this.GAMES.filter( game => game.away.id === team.id || game.home.id === team.id);
            if (games.length === 0) {
                return { id: v4(), name: team.name, wins: 0, loses: 0, ratio: 0, goals: 0, lose: 0, diff: 0};
            }
            return games.reduce((acc, game) => {
                const g = this.makeGame(game);
                if (game.home.id === team.id) {
                    if (g.goals.home.length > g.goals.away.length) {
                        acc.wins++;
                    } else if (g.goals.home.length < g.goals.away.length) {
                        acc.loses++;
                    }
                    acc.goals += g.goals.home.length;
                    acc.lose += g.goals.away.length
                } else {
                    if (g.goals.home.length > g.goals.away.length) {
                        acc.loses++;
                    } else if (g.goals.home.length < g.goals.away.length) {
                        acc.wins++;
                    }
                    acc.goals += g.goals.away.length;
                    acc.lose += g.goals.home.length
                }
                acc.games++;
                acc.ratio = acc.wins / acc.games;
                acc.diff = acc.goals - acc.lose;
                return acc;
            }, { id: v4(), name: team.name, games: 0, wins: 0, loses: 0, ratio: 0, goals: 0, lose: 0, diff: 0});
        });
        return timeout(teams);
    }

    getGame(id) {
        const game = this.makeGame(this.GAMES.find(item => item.id === id));
        return timeout(game);
    }

    getPlayerHistory(id) {
        const games = {};
        const goals = this.GOALS.filter(goal => goal.player === id);
        if (goals.length === 0) {
            return timeout([]);
        }
        goals
            .sort((a,b) => {
                if (a.tm > b.tm) return 1;
                if (a.tm < b.tm) return -1;
                return 0;
            })
            .forEach(goal => {
            if (!games[goal.game]) {
                const game = this.GAMES.find(game => goal.game === game.id);
                games[goal.game] = {home: game.home.name, away: game.away.name, goals: 1};
            } else {
                games[goal.game].goals++;
            }
        });
        return timeout(Object.values(games));
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
