class DbDriver {
    getPlayers() {return [];}
    getTeams() {return [];}
    getGames() {return [];}
    getDashboard() {return [];}

    addPlayer(player) {return player;}

    deletePlayer(id) {return true;}
}

module.exports = DbDriver;
