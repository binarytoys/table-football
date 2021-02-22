const config = require('config')

const request = require('supertest');
const expect = require('chai').expect;
const assert = require('chai').assert;
const mysql = require('mysql');

const DbDriverMySQL = require('../database/dbdriver-mysql');
const Server = require('../server');

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
            done();
        });
    });



})();
