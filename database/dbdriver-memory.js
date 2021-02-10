const DbDriver = require('./dbdriver-base');
const {v4} = require('uuid');

class DbDriverMemory extends DbDriver {
    PLAYERS = [
        {
            id: v4(),
            name: 'Thomas',
            surname: 'Partey',
            team: 'Bern'
        },
        {
            id: v4(),
            name: 'Robert',
            surname: 'Lewandovski',
            team: 'Bern'
        },
        {
            id: v4(),
            name: 'Lionel',
            surname: 'Messi',
            team: 'Zurich'
        },
        {
            id: v4(),
            name: 'Cristiano',
            surname: 'Ronaldo',
            team: 'Geneva'
        },
        {
            id: v4(),
            name: 'Kylian',
            surname: 'Lottin',
            team: 'Basel'
        },
        {
            id: v4(),
            name: 'Bruno',
            surname: 'Fernandes',
            team: 'Luzern'
        },
        {
            id: v4(),
            name: 'Erlin',
            surname: 'Haaland',
            team: 'Chur'
        },
        {
            id: v4(),
            name: 'Ciro',
            surname: 'Immobile',
            team: 'Geneva'
        },
    ];
    TEAMS = [
        {
            id: v4(),
            name: 'Bern'
        },
        {
            id: v4(),
            name: 'Zurich'
        },
        {
            id: v4(),
            name: 'Basel'
        },
        {
            id: v4(),
            name: 'Bern'
        },
        {
            id: v4(),
            name: 'Geneva'
        },
        {
            id: v4(),
            name: 'Friburg'
        },
        {
            id: v4(),
            name: 'Luzern',
        },
        {
            id: v4(),
            name: 'Chur'
        },
    ];
    GAMES = [
        {
            id: v4(),
            home: 'Bern',
            away: 'Zurich',
            result: '3:1'
        },
        {
            id: v4(),
            home: 'Basel',
            away: 'Bern',
            result: '2:3'
        },
        {
            id: v4(),
            home: 'Geneva',
            away: 'Friburg',
            result: '1:0'
        },
        {
            id: v4(),
            home: 'Luzern',
            away: 'Chur',
            result: '1:1'
        }
    ];
    DASHBOARD = [
        {
            id: v4(),
            name: 'Bern',
            wins: 10,
            loses: 2,
            ratio: 10 / 2,
            goals: 15,
            lose: 10,
            diff: 15 - 10
        },
        {
            id: v4(),
            name: 'Zurich',
            wins: 5,
            loses: 7,
            ratio: 5 / 7,
            goals: 8,
            lose: 12,
            diff: 8 - 12
        },
        {
            id: v4(),
            name: 'Basel',
            wins: 6,
            loses: 6,
            ratio: 6 / 6,
            goals: 10,
            lose: 12,
            diff: 10 - 12
        },
        {
            id: v4(),
            name: 'Geneva',
            wins: 7,
            loses: 6,
            ratio: 7 / 6,
            goals: 14,
            lose: 12,
            diff: 14 - 12
        },
    ];

    async getPlayers() {
        return new Promise((resolve => {
            setTimeout(() => {
                resolve( this.PLAYERS );
            }, 1000);
        }));
    }

    getTeams() {
        return new Promise((resolve => {
            setTimeout(() => {
                resolve( this.TEAMS );
            }, 1000);
        }));
    }

    getGames() {
        return new Promise((resolve => {
            setTimeout(() => {
                resolve( this.GAMES );
            }, 1000);
        }));
    }

    getDashboard() {
        return new Promise((resolve => {
            setTimeout(() => {
                resolve( this.DASHBOARD );
            }, 1000);
        }));
    }
}

module.exports = DbDriverMemory;
