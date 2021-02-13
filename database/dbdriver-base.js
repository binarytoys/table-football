class DbDriver {
    getPlayers() {return [];}
    getTeams() {return [];}
    getGames() {return [];}
    getDashboard() {return [];}

    addPlayer(player) {return player;}

    deletePlayer(id) {return true;}

    updatePlayer(player) {return player;}
}

module.exports = DbDriver;
