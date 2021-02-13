const DbDriver = require('./dbdriver-base');
// const {v4} = require('uuid');

const timeout = (data) => {return new Promise((resolve => {setTimeout(()=>{resolve(data)}, 1000)}))};

class DbDriverMemory extends DbDriver {
    PLAYERS = [
        {
            id: '1',
            name: 'Thomas',
            surname: 'Partey',
            team: 'Bern'
        },
        {
            id: '2',
            name: 'Robert',
            surname: 'Lewandovski',
            team: 'Bern'
        },
        {
            id: '3',
            name: 'Lionel',
            surname: 'Messi',
            team: 'Zurich'
        },
        {
            id: '4',
            name: 'Cristiano',
            surname: 'Ronaldo',
            team: 'Geneva'
        },
        {
            id: '5',
            name: 'Kylian',
            surname: 'Lottin',
            team: 'Basel'
        },
        {
            id: '6',
            name: 'Bruno',
            surname: 'Fernandes',
            team: 'Luzern'
        },
        {
            id: '7',
            name: 'Erlin',
            surname: 'Haaland',
            team: 'Chur'
        },
        {
            id: '8',
            name: 'Ciro',
            surname: 'Immobile',
            team: 'Geneva'
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
            id: '4',
            name: 'Bern'
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
            home: 'Bern',
            away: 'Zurich',
            result: '3:1'
        },
        {
            id: '2',
            home: 'Basel',
            away: 'Bern',
            result: '2:3'
        },
        {
            id: '3',
            home: 'Geneva',
            away: 'Friburg',
            result: '1:0'
        },
        {
            id: '4',
            home: 'Luzern',
            away: 'Chur',
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
        {
            id: '1',
            game: '1',
            player: '1',
            team: '1'
        }
    ]

    async getPlayers() {
        return timeout(this.PLAYERS);
    }

    getTeams() {
        return timeout(this.TEAMS);
    }

    getGames() {
        return timeout(this.GAMES);
    }

    getDashboard() {
        return timeout(this.DASHBOARD);
    }

    addPlayer(player) {
        console.log(player);
        const check = this.PLAYERS.find((item) => item.name.toLowerCase() === player.name.toLowerCase()
            && item.surname.toLowerCase() === player.surname.toLowerCase());
        if (check) {
            return timeout(null);
        }
        this.PLAYERS.push(player);
        return timeout(player);
    }
}

module.exports = DbDriverMemory;
