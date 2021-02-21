const DbDriver = require('./dbdriver-base');
const {v4} = require('uuid')
const mysql = require('mysql');
const OkPacket = require("mysql");


const dbInit = [

    //
    // Table: teams
    // Begin
    //
    "CREATE TABLE IF NOT EXISTS `teams` (" +
    "`id` varchar(50) NOT NULL PRIMARY KEY," +
    "`name` varchar(50) NOT NULL," +
    " UNIQUE KEY `unique_name` (`name`)" +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8;",

    "INSERT INTO `teams` VALUES ('1','Bern')",
    "INSERT INTO `teams` VALUES ('2','Zurich')",
    "INSERT INTO `teams` VALUES ('3','Basel')",
    "INSERT INTO `teams` VALUES ('5','Geneva')",
    "INSERT INTO `teams` VALUES ('6','Fribourg')",
    "INSERT INTO `teams` VALUES ('7','Luzern')",
    "INSERT INTO `teams` VALUES ('8','Chur')",
    //
    // End
    //

    //
    // Table: players
    // Begin
    //
    "CREATE TABLE IF NOT EXISTS `players` (" +
    "`id` varchar(50) NOT NULL PRIMARY KEY," +
    "`name` varchar(50) NOT NULL," +
    "`surname` varchar(50) NOT NULL," +
    "`team` varchar(50) NOT NULL," +
    " UNIQUE KEY `full_name` (`name`, `surname`)" +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8",

    "INSERT INTO `players` VALUES ('1','Thomas', 'Partey', '1')",
    "INSERT INTO `players` VALUES ('2','Robert', 'Lewandovski', '1')",
    "INSERT INTO `players` VALUES ('3','Lionel', 'Messi', '2')",
    "INSERT INTO `players` VALUES ('4','Cristiano', 'Ronaldo', '5')",
    "INSERT INTO `players` VALUES ('5','Kylian', 'Lottin', '3')",
    "INSERT INTO `players` VALUES ('6','Bruno', 'Fernandes', '7')",
    "INSERT INTO `players` VALUES ('7','Erlin', 'Haaland', '8')",
    "INSERT INTO `players` VALUES ('8','Ciro', 'Immobile', '5')",
    "INSERT INTO `players` VALUES ('9','Dusan', 'Tadic', '6')",
    "INSERT INTO `players` VALUES ('10','Harry', 'Kane', '3')",
    "INSERT INTO `players` VALUES ('11','Pizzi', '', '3')",
    //
    // End
    //


    //
    // Table: games
    // Begin
    //
    "CREATE TABLE IF NOT EXISTS `games` (" +
    "`id` varchar(50) NOT NULL PRIMARY KEY," +
    "`home` varchar(50) NOT NULL," +
    "`away` varchar(50) NOT NULL," +
    " UNIQUE KEY `unique_index` (`id`) " +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8;",

    "INSERT INTO `games` VALUES ('1', '1', '2')",
    "INSERT INTO `games` VALUES ('2', '3', '1')",
    "INSERT INTO `games` VALUES ('3', '5', '6')",
    "INSERT INTO `games` VALUES ('4', '7', '8')",
    "INSERT INTO `games` VALUES ('5', '6', '7')",
    //
    // End
    //

    //
    // Table: goals
    // Begin
    //
    "CREATE TABLE IF NOT EXISTS `goals` (" +
    "`id` varchar(50) NOT NULL PRIMARY KEY," +
    "`game` varchar(50) NOT NULL," +
    "`player` varchar(50) NOT NULL," +
    "`team` varchar(50) NOT NULL," +
    "`favor` varchar(50) NOT NULL," +
    "`tm` bigint NOT NULL," +
    " UNIQUE KEY `unique_index` (`id`) " +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8;",

    "INSERT INTO `goals` VALUES ('1', '1', '1', '1', '1', 1000)",
    "INSERT INTO `goals` VALUES ('2', '1', '2', '1', '1', 1100)",
    "INSERT INTO `goals` VALUES ('3', '1', '3', '2', '2', 1200)",
    "INSERT INTO `goals` VALUES ('4', '1', '1', '1', '1', 1300)",
    "INSERT INTO `goals` VALUES ('5', '2', '1', '1', '1', 1400)",
    "INSERT INTO `goals` VALUES ('6', '2', '1', '1', '1', 1500)",
    "INSERT INTO `goals` VALUES ('7', '2', '2', '1', '1', 1600)",
    "INSERT INTO `goals` VALUES ('8', '2', '11', '3', '3', 1700)",
    "INSERT INTO `goals` VALUES ('9', '2', '10', '3', '3', 1800)",
    "INSERT INTO `goals` VALUES ('10', '3', '8', '5', '5', 1900)",
    "INSERT INTO `goals` VALUES ('11', '4', '6', '7', '7', 2000)",
    "INSERT INTO `goals` VALUES ('12', '4', '7', '8', '8', 1000)",
    //
    // End
    //
];

function makeVal(value, isLast = false) {
    if (typeof value ==='string' || value instanceof String){
        return ('\"' + value + '\"' + (isLast ? '' : ', '));
    }
    return value;
}

class DbDriverMySQL extends DbDriver {

    constructor(params) {
        super();
        this.myVersion = 0;

        this.params = {
                connectionLimit:10,
                host           :null,
                user           :null,
                password       :null,
                database       :null,
                timezone       :null,
            ...params
        };
        // this.dbInstaller = dbInit;

        this.pool = mysql.createPool({
            connectionLimit:this.params.connectionLimit,
            host           :this.params.host,
            user           :this.params.user,
            password       :this.params.password,
            timezone       :this.params.timezone,
            database       :this.params.database
        });

        console.log(this.params);
    }

    async query(query) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                connection.query(query, (err, result) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        return reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        })
    };

    async makeVersionZero() {
        const dbCredentials = {
            host     : this.params.host,
            user     : this.params.user,
            timezone : this.params.timezone,
            password : this.params.password
        };

        const dbName = this.params.database;

        const connection = mysql.createConnection(dbCredentials);

        let dbCreate = "CREATE DATABASE IF NOT EXISTS " + dbName;
        connection.query(dbCreate, function (err, result){
            connection.destroy();

            if (err) {
                err.message = 'query[' + dbCreate + '] ' + err.message;
                console.log(err);
                return;
            }

            dbCredentials['database'] = dbName;

            let connection2 = mysql.createConnection(dbCredentials);

            (async ()=> {
                for (const query of dbInit) {
                    const res = await ((query) => {
                        return new Promise((res, rej) => {
                            connection2.query(query, (err, result) => {
                                if (err) {
                                    err.message = 'query[' + query + '] ' + err.message;
                                    console.log(err);
                                    rej(err);
                                }
                                res(result);
                            });
                        });
                    })(query);
                }
            })();
        });
    }

    async init() {
        return new Promise((resolve, reject) => {
            try {
                let connection = mysql.createConnection({
                    host     : this.params.host,
                    user     : this.params.user,
                    timezone : this.params.timezone,
                    password : this.params.password
                });

                let dbExist = "SELECT SCHEMA_NAME FROM `information_schema`.`schemata` WHERE SCHEMA_NAME = '"
                    + this.params.database + "'";

                connection.query(dbExist, (err, result) => {
                    connection.destroy();
                    if (err) {
                        console.log('query[' + dbExist + '] ', err);
                        reject(err);
                    }
                    if (result.length === 0) {
                        (async ()=>{
                            resolve(await this.makeVersionZero());
                        })();
                    }
                    else {
                        // a good point for DB update
                        console.log('Database already exist');
                        resolve(true);
                    }
                });
            }
            catch (ex) {
                console.log("* FATAL ERROR DURING DB DRIVER INIT!", ex);
                reject(ex);
            }
        })
    }

    async getTeams() {
        const teams = await this.query('SELECT * FROM `teams`;');
        console.log(teams);

        return teams;
    }

    async getPlayers() {
        const rawPlayers = await this.query('SELECT players.id AS `player_id`, name, surname, players.team AS player_team, goals.* FROM `players` LEFT JOIN `goals` ON players.id = goals.player AND goals.team = goals.favor;');
        const players = rawPlayers.reduce((acc, player) => {
            if (player.player_id in acc) {
                acc[player.player_id].goals.push({
                    id: player.id,
                    game: player.game,
                    player: player.player_id,
                    team: player.team,
                    favor: player.favor,
                    tm: player.tm});
            } else {
                acc[player.player_id] = {
                    id: player.player_id,
                    name: player.name,
                    surname: player.surname,
                    team: player.player_team,
                    goals: player.id ? [{
                        id: player.id,
                        game: player.game,
                        player: player.player_id,
                        team: player.team,
                        favor: player.favor,
                        tm: player.tm}
                        ] : []
                };
            }
            return acc;
        }, {});
        const res = Object.values(players);
        console.log(res);
        return res;// players;
    }

    async getDashboard() {
        const rawTeams = await this.query('SELECT * FROM `teams`;');
        const gamesRaw = await this.getGames();
        console.log(gamesRaw);

        const teams = rawTeams.map( team => {
            const games = gamesRaw.filter( game => game.away.id === team.id || game.home.id === team.id);
            if (games.length === 0) {
                return { id: v4(), name: team.name, wins: 0, loses: 0, ratio: 0, goals: 0, lose: 0, diff: 0};
            }
            return games.reduce((acc, game) => {
                acc.games++;
                if (game.goals && (game.goals.home.length > 0 || game.goals.away.length > 0)) {
                    if (game.home.id === team.id) {
                        if (game.goals.home.length > game.goals.away.length) {
                            acc.wins++;
                        } else if (game.goals.home.length < game.goals.away.length) {
                            acc.loses++;
                        }
                        acc.goals += game.goals.home.length;
                        acc.lose += game.goals.away.length
                    } else {
                        if (game.goals.home.length > game.goals.away.length) {
                            acc.loses++;
                        } else if (game.goals.home.length < game.goals.away.length) {
                            acc.wins++;
                        }
                        acc.goals += game.goals.away.length;
                        acc.lose += game.goals.home.length
                    }
                    acc.ratio = acc.wins / acc.games;
                    acc.diff = acc.goals - acc.lose;
                }
                return acc;
            }, { id: v4(), name: team.name, games: 0, wins: 0, loses: 0, ratio: 0, goals: 0, lose: 0, diff: 0});
        })
        return teams;
    }

    async getGames() {
        const rawGames = await this.query('SELECT games.id AS `games_id`, home, away, goals.*, h_name.name AS `name_home`, a_name.name AS `name_away`\n' +
            'FROM `games`\n' +
            ' LEFT JOIN `goals` ON games.id = goals.game\n' +
            ' LEFT JOIN `teams` AS `h_name` ON games.home = h_name.id\n' +
            ' LEFT JOIN `teams` AS `a_name` ON games.away = a_name.id;');
        console.log(rawGames);
        const games = rawGames.reduce((acc, game) => {
            if (game.games_id in acc) {
                if (game.favor === game.home) {
                    acc[game.games_id].goals.home.push({
                        id: game.id,
                        player: game.player,
                        team: game.team,
                        favor: game.favor,
                        game: game.game,
                        tm: game.tm});
                } else {
                    acc[game.games_id].goals.away.push({
                        id: game.id,
                        player: game.player,
                        team: game.team,
                        favor: game.favor,
                        game: game.game,
                        tm: game.tm});
                }
                acc[game.games_id]['result'] = `${acc[game.games_id].goals.home.length}:${acc[game.games_id].goals.away.length}`;
            } else {
                acc[game.games_id] = {
                    id: game.games_id,
                    home: { id: game.home, name: game.name_home },
                    away: { id: game.away, name: game.name_away },
                    result: '0:0'
                };
                if (game.id) {
                    const home = game.favor === game.home ? [{
                        id: game.id,
                        player: game.player,
                        team: game.team,
                        favor: game.favor,
                        game: game.game,
                        tm: game.tm}] : [];
                    const away = game.favor === game.away ? [{
                        id: game.id,
                        player: game.player,
                        team: game.team,
                        favor: game.favor,
                        game: game.game,
                        tm: game.tm}] : [];
                    acc[game.games_id]['result'] = `${home.length}:${away.length}`;
                    acc[game.games_id]['goals'] = {home, away};
                }
            }
            return acc;
        }, {});
        const res = Object.values(games);
        console.log(res);
        return res;
    }

    async getGame(id) {
        const rawGames = await this.query('SELECT games.id AS `games_id`, home, away, goals.*, h_name.name AS `name_home`, a_name.name AS `name_away`\n' +
            'FROM `games`\n' +
            'LEFT JOIN `goals` ON games.id = goals.game\n' +
            'LEFT JOIN `teams` AS `h_name` ON games.home = h_name.id\n' +
            'LEFT JOIN `teams` AS `a_name` ON games.away = a_name.id\n' +
            'WHERE games.id = "' + id + '";');
        console.log(rawGames);
        const games = rawGames.reduce((acc, game) => {
            if (game.games_id in acc) {
                if (game.favor === game.home) {
                    acc[game.games_id].goals.home.push({
                        id: game.id,
                        player: game.player,
                        team: game.team,
                        favor: game.favor,
                        game: game.game,
                        tm: game.tm});
                } else {
                    acc[game.games_id].goals.away.push({
                        id: game.id,
                        player: game.player,
                        team: game.team,
                        favor: game.favor,
                        game: game.game,
                        tm: game.tm});
                }
                acc[game.games_id]['result'] = `${acc[game.games_id].goals.home.length}:${acc[game.games_id].goals.away.length}`;
            } else {
                acc[game.games_id] = {
                    id: game.games_id,
                    home: { id: game.home, name: game.name_home },
                    away: { id: game.away, name: game.name_away },
                    result: '0:0'
                };
                if (game.id) {
                    const home = game.favor === game.home ? [{
                        id: game.id,
                        player: game.player,
                        team: game.team,
                        favor: game.favor,
                        game: game.game,
                        tm: game.tm}] : [];
                    const away = game.favor === game.away ? [{
                        id: game.id,
                        player: game.player,
                        team: game.team,
                        favor: game.favor,
                        game: game.game,
                        tm: game.tm}] : [];
                    acc[game.games_id]['result'] = `${home.length}:${away.length}`;
                    acc[game.games_id]['goals'] = {home, away};
                }
            }
            return acc;
        }, {});
        const res = Object.values(games);
        console.log(res);
        return res[0];
    }

    async getPlayerHistory(id) {
        const games = {};
        const goals = await this.query('SELECT * FROM `goals` WHERE goals.player = "' + id + '";');
        if (goals.length === 0) {
            return [];
        }
        for (const goal of goals
            .sort((a, b) => {
                if (a.tm > b.tm) return 1;
                if (a.tm < b.tm) return -1;
                return 0;
            })) {
                if (!games[goal.game]) {
                    const game = await this.query('SELECT games.id AS `games_id`, home, away, h_name.name AS `name_home`, a_name.name AS `name_away`\n' +
                        'FROM `games`\n' +
                        'LEFT JOIN `teams` AS `h_name` ON games.home = h_name.id\n' +
                        'LEFT JOIN `teams` AS `a_name` ON games.away = a_name.id\n' +
                        'WHERE games.id = "' + goal.game + '";');
                    console.log(game);
                    games[goal.game] = {home: game[0].name_home, away: game[0].name_away, goals: 1};
                } else {
                    games[goal.game].goals++;
                }
            }
        console.log(games);
        return games;
    }

    async addPlayer(player) {
        player['id'] = v4();
        return this.query('INSERT INTO `players` (`id`, `name`, `surname`, `team`) ' +
            'VALUES ('
            + makeVal(player.id)
            + makeVal(player.name)
            + makeVal(player.surname)
            + makeVal(player.team, true)
            + ');')
            .then((res) => {
                console.log(res);
                return player;
            })
            .catch((res) => {
                // console.log(res);
                return {error: res.sqlMessage};
            });
    }

    async addTeam(team) {
        team['id'] = v4();
        const q = 'INSERT INTO `teams` (`id`, `name`) '
            + 'VALUES ('
            + makeVal(team.id)
            + makeVal(team.name, true)
            + ');';
        console.log('ADD TEAM: ' + q);
        return this.query(q)
            .then((res) => {
                console.log(res);
                return team;
            })
            .catch((res) => {
                // console.log(res);
                return {error: res.sqlMessage};
            });
    }

    async addGame(game) {
        game['id'] = v4();
        const q = 'INSERT INTO `games` (`id`, `home`, `away`) '
            + 'VALUES ('
            + makeVal(game.id)
            + makeVal(game.home.id)
            + makeVal(game.away.id, true)
            + ');';
        console.log('ADD GAME: ' + q);
        return this.query(q)
            .then((res) => {
                console.log(res);
                return game;
            })
            .catch((res) => {
                // console.log(res);
                return {error: res.sqlMessage};
            });
    }

    async addGoal(goal) {
        goal['id'] = v4();
        const q = 'INSERT INTO `goals` (`id`, `game`, `player`, `team`, `favor`, `tm`) '
            + 'VALUES ('
            + makeVal(goal.id)
            + makeVal(goal.game)
            + makeVal(goal.player)
            + makeVal(goal.team)
            + makeVal(goal.favor)
            + makeVal(goal.tm, true)
            + ');';
        console.log(q);
        return this.query(q)
            .then((res) => {
                console.log(res);
                return goal;
            })
            .catch((res) => {
                // console.log(res);
                return {error: res.sqlMessage};
            });
    }

    async deleteTeam(id) {
        const q = 'DELETE FROM `teams` WHERE `id`=' + makeVal(id, true) + ';';
        console.log('DELETE TEAM: ' + q);
        return this.query(q)
            .then((res) => {
                console.log(res);
                return res instanceof OkPacket;
            })
            .catch((res) => {
                // console.log(res);
                return {error: res.sqlMessage};
            });
    }

    async deletePlayer(id) {
        return this.query('DELETE FROM `players` WHERE `id`=' + makeVal(id, true) + ';')
            .then((res) => {
                console.log(res);
                return res instanceof OkPacket;
            })
            .catch((res) => {
                // console.log(res);
                return {error: res.sqlMessage};
            });
    }

    async updateTeam(team) {
        const q = 'UPDATE `teams` SET `teams`.`name`=' + makeVal(team.name, true)
            + ' WHERE `teams`.`id` = ' + makeVal(team.id, true) + ';'
        console.log(q);
        return this.query(q)
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch((res) => {
                // console.log(res);
                return {error: res.sqlMessage};
            });
    }

    async updatePlayer(player) {
        const q = 'UPDATE `players` SET '
            + '`players`.`name`=' + makeVal(player.name)
            + '`players`.`surname`=' + makeVal(player.surname)
            + '`players`.`team`=' + makeVal(player.team, true)
            + ' WHERE `players`.`id` = ' + makeVal(player.id, true) + ';'
        console.log(q);
        return this.query(q)
            .then((res) => {
                console.log(res);
                return res;
            })
            .catch((res) => {
                // console.log(res);
                return {error: res.sqlMessage};
            });
    }

}

module.exports = DbDriverMySQL;
