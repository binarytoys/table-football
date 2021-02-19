const DbDriver = require('./dbdriver-base');
const {v4} = require('uuid')
const mysql = require('mysql');


const dbInit = [

    //
    // Table: players
    // Begin
    //
    "CREATE TABLE IF NOT EXISTS `players` (" +
    "`id` varchar(50) NOT NULL PRIMARY KEY," +
    "`name` varchar(50) NOT NULL," +
    "`surname` varchar(50) NOT NULL," +
    "`team` varchar(50) NOT NULL," +
    "UNIQUE KEY `unique_name` (`id`)" +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8",

    "INSERT INTO `players` VALUES ('1','Thomas', 'Partey', '1')",
    "INSERT INTO `players` VALUES ('2','Robert', 'Lewandovski', '1')",
    "INSERT INTO `players` VALUES ('3','Lionel', 'Messi', '2')",
    "INSERT INTO `players` VALUES ('4','Cristiano', 'Ronaldo', '5')",
    "INSERT INTO `players` VALUES ('5','Kylian', 'Lottin', '3')",
    "INSERT INTO `players` VALUES ('6','Bruno', 'Fernandes', '7')",
    "INSERT INTO `players` VALUES ('7','Erlin', 'Haaland', '6')",
    "INSERT INTO `players` VALUES ('8','Ciro', 'Immobile', '5')",
    "INSERT INTO `players` VALUES ('9','Dusan', 'Tadic', '6')",
    "INSERT INTO `players` VALUES ('10','Harry', 'Kane', '3')",
    "INSERT INTO `players` VALUES ('11','Pizzi', '', '3')",
    //
    // End
    //


    //
    // Table: teams
    // Begin
    //
    "CREATE TABLE IF NOT EXISTS `teams` (" +
    "`id` varchar(50) NOT NULL PRIMARY KEY," +       // alphanumeric customer code
    "`name` varchar(50) NOT NULL," +
    "UNIQUE KEY `unique_index` (`id`)" +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8;",

    "INSERT INTO `teams` VALUES ('1','Bern')",
    "INSERT INTO `teams` VALUES ('2','Zurich')",
    "INSERT INTO `teams` VALUES ('3','Basel')",
    "INSERT INTO `teams` VALUES ('4','Geneva')",
    "INSERT INTO `teams` VALUES ('5','Fribourg')",
    "INSERT INTO `teams` VALUES ('6','Luzern')",
    "INSERT INTO `teams` VALUES ('7','Chur')",
    //
    // End
    //

    //
    // Table: games
    // Begin
    //
    "CREATE TABLE IF NOT EXISTS `games` (" +
    "`id` varchar(50) NOT NULL PRIMARY KEY," +       // alphanumeric customer code
    "`home` varchar(50) NOT NULL," +
    "`away` varchar(50) NOT NULL," +
    "UNIQUE KEY `unique_index` (`id`)" +
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8;",

    "INSERT INTO `games` VALUES ('1', '1', '2')",
    "INSERT INTO `games` VALUES ('2', '3', '1')",
    "INSERT INTO `games` VALUES ('3', '5', '6')",
    "INSERT INTO `games` VALUES ('4', '7', '8')",
    //
    // End
    //

    //
    // Table: goals
    // Begin
    //
    "CREATE TABLE IF NOT EXISTS `goals` (" +
    "`id` varchar(50) NOT NULL PRIMARY KEY," +       // alphanumeric customer code
    "`game` varchar(50) NOT NULL," +
    "`player` varchar(50) NOT NULL," +
    "`team` varchar(50) NOT NULL," +
    "`favor` varchar(50) NOT NULL," +
    "`tm` int(11) NOT NULL," +
    "UNIQUE KEY `unique_index` (`id`)" +
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
            // init: dbInit,
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

    async query(query, callback) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((connection) => {
                connection.query(query, function (err, result){
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                    /* istanbul ignore next */
                    // _this.runCallback(callback, result, err);
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

            // const len = dbInit.length;
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
            // resolve(true);
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
                    /* istanbul ignore next */
                    if (err) {
                        console.log('query[' + dbExist + '] ', err);
                        reject(err);
                    }
                    /* istanbul ignore else */
                    if (result.length === 0) {
                        (async ()=>{
                            resolve(await this.makeVersionZero());
                        })();
                    }
                    else {
                        // a good point for DB update
                        console.log('Database already exist');
                    }
                });
            }
            catch (ex) {
                /* istanbul ignore next */
                console.log("* FATAL ERROR DURING DB DRIVER INIT!", ex);
                reject(ex);
            }

        })
    }

}

module.exports = DbDriverMySQL;
