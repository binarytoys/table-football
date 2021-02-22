const config = require('config')

const request = require('supertest');
const expect = require('chai').expect;
const assert = require('chai').assert;
const mysql = require('mysql');
const chai = require('chai');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);

const DbDriverMySQL = require('../database/dbdriver-mysql');
const Server = require('../server');

const testTeams = [
    { id: '3', name:"Basel"},
    { id: '1', name:"Bern"},
    { id: '8', name:"Chur"},
    { id: '6', name:"Fribourg"},
    { id: '5', name:"Geneva"},
    { id: '7', name:"Luzern"},
    { id: '2', name:"Zurich"}
    ];

const testPlayers = [
    {
        id: '1',
        name: 'Thomas',
        surname: 'Partey',
        team: '1',
        goals: [
            {
                id: '1',
                game: '1',
                player: '1',
                team: '1',
                favor: '1',
                tm: 1000
            },
            {
                id: '4',
                game: '1',
                player: '1',
                team: '1',
                favor: '1',
                tm: 1300
            },
            {
                id: '5',
                game: '2',
                player: '1',
                team: '1',
                favor: '1',
                tm: 1400
            },
            {
                id: '6',
                game: '2',
                player: '1',
                team: '1',
                favor: '1',
                tm: 1500
            } ]
    },
    {
        id: '2',
        name: 'Robert',
        surname: 'Lewandovski',
        team: '1',
        goals: [
            {
                id: '2',
                game: '1',
                player: '2',
                team: '1',
                favor: '1',
                tm: 1100
            },
            {
                id: '7',
                game: '2',
                player: '2',
                team: '1',
                favor: '1',
                tm: 1600
            }
        ]
    },
    {
        id: '3',
        name: 'Lionel',
        surname: 'Messi',
        team: '2',
        goals: [ {
            id: '3',
            game: '1',
            player: '3',
            team: '2',
            favor: '2',
            tm: 1200
        } ]
    },
    {
        id: '4',
        name: 'Cristiano',
        surname: 'Ronaldo',
        team: '5',
        goals: []
    },
    { id: '5', name: 'Kylian', surname: 'Lottin', team: '3', goals: [] },
    {
        id: '6',
        name: 'Bruno',
        surname: 'Fernandes',
        team: '7',
        goals: [ {
            id: '11',
            game: '4',
            player: '6',
            team: '7',
            favor: '7',
            tm: 2000
        } ]
    },
    {
        id: '7',
        name: 'Erlin',
        surname: 'Haaland',
        team: '8',
        goals: [ {
            id: '12',
            game: '4',
            player: '7',
            team: '8',
            favor: '8',
            tm: 3000
        } ]
    },
    {
        id: '8',
        name: 'Ciro',
        surname: 'Immobile',
        team: '5',
        goals: [ {
            id: '10',
            game: '3',
            player: '8',
            team: '5',
            favor: '5',
            tm: 1900
        } ]
    },
    { id: '9', name: 'Dusan', surname: 'Tadic', team: '6', goals: [] },
    {
        id: '10',
        name: 'Harry',
        surname: 'Kane',
        team: '3',
        goals: [ {
            id: '9',
            game: '2',
            player: '10',
            team: '3',
            favor: '3',
            tm: 1800
        } ]
    },
    {
        id: '11',
        name: 'Pizzi',
        surname: '',
        team: '3',
        goals: [ {
            id: '8',
            game: '2',
            player: '11',
            team: '3',
            favor: '3',
            tm: 1700
        } ]
    }
    ];

const testGames = [
    {
        id: '1',
        home: { id: '1', name: 'Bern' },
        away: { id: '2', name: 'Zurich' },
        result: '3:1',
        goals: { home: [{
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
                    id: '4',
                    game: '1',
                    player: '1',
                    team: '1',
                    favor: '1',
                    tm: 1300
                }],
            away: [{
                    id: '3',
                    game: '1',
                    player: '3',
                    team: '2',
                    favor: '2',
                    tm: 1200
                }] }
    },
    {
        id: '2',
        home: { id: '3', name: 'Basel' },
        away: { id: '1', name: 'Bern' },
        result: '2:3',
        goals: { home: [{
                    id: '8',
                    game: '2',
                    player: '11',
                    team: '3',
                    favor: '3',
                    tm: 1700
                },
                {
                    id: '9',
                    game: '2',
                    player: '10',
                    team: '3',
                    favor: '3',
                    tm: 1800
                }],
                away: [{
                    id: '5',
                    game: '2',
                    player: '1',
                    team: '1',
                    favor: '1',
                    tm: 1400
                },{
                    id: '6',
                    game: '2',
                    player: '1',
                    team: '1',
                    favor: '1',
                    tm: 1500
                },
                {
                    id: '7',
                    game: '2',
                    player: '2',
                    team: '1',
                    favor: '1',
                    tm: 1600
                },] }
    },
    {
        id: '3',
        home: { id: '5', name: 'Geneva' },
        away: { id: '6', name: 'Fribourg' },
        result: '1:0',
        goals: { home: [{
                id: '10',
                game: '3',
                player: '8',
                team: '5',
                favor: '5',
                tm: 1900
            }], away: [] }
    },
    {
        id: '4',
        home: { id: '7', name: 'Luzern' },
        away: { id: '8', name: 'Chur' },
        result: '1:1',
        goals: { home: [{
                id: '11',
                game: '4',
                player: '6',
                team: '7',
                favor: '7',
                tm: 2000
            }], away: [{
                id: '12',
                game: '4',
                player: '7',
                team: '8',
                favor: '8',
                tm: 3000
            }] }
    },
    {
        id: '5',
        home: { id: '6', name: 'Fribourg' },
        away: { id: '7', name: 'Luzern' },
        result: '0:0'
    }
];

const objectsEqual = (o1, o2) => {
    return (toString.call(o1) === '[object Object]' && Object.keys(o1).length > 0 ?
        (Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p])))
        : o1 === o2) ||
        (toString.call(o1) === '[object Array]' && isArrayEq(o1, o2)
        );
}
const isArrayEq = (a1, a2) => {
    if (a1.length !== a2.length) {
        return false;
    }
    for (const item of a1) {
        let found = false;
        for (const item2 of a2) {
            if (objectsEqual(item, item2)) {
                found = true;
                break;
            }
        }
        if (!found) {
            return false;
        }
    }
    return true;
}

(() => {
    let testService = undefined;
    let connection = undefined;

    before(function(done){
        this.timeout(50000);

        const conf = { ... config.get('mysql'), database: 'test_football_database', host: 'localhost' };

        // initialize dbDriver
        // conf.database = "test_football_database";
        // conf.host = 'localhost';

        connection = mysql.createConnection({
            host     : conf.host,
            user     : conf.user,
            password : conf.password,
            timezone : conf.timezone
        });

        // drop test database
        connection.query("DROP DATABASE IF EXISTS " + conf.database, function(err) {
            // connection.destroy();
            //if(!err) connection.end();
            const dbDriver = new DbDriverMySQL(conf);

            testService = new Server(dbDriver);

            (async() => {
                await testService.init();
                done();
            })();
        });
    });

    after(function(done) {
        console.log("Football Table TEST ENDED");
        connection.end();
        testService.quit();
        done();
    });

    describe('Service basic functions -', ()=> {
        it ('Get teams', (done) => {
            request(testService.getExpress())
                .get('/api/teams')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    const teams = res.body;
                    console.log(teams);
                    expect(isArrayEq(teams, testTeams)).to.be.true;
                    done();
                });
        });

        it ('Get players', (done) => {
            request(testService.getExpress())
                .get('/api/players')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    const players = res.body;
                    console.log(players);
                    expect(isArrayEq(players, testPlayers)).to.be.true;
                    done();
                });
        });

        it ('Get games', (done) => {
            request(testService.getExpress())
                .get('/api/games')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    const games = res.body;
                    console.log(games);
                    expect(isArrayEq(games, testGames)).to.be.true;
                    done();
                });
        });
    });



})();
