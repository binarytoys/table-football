class DbDriver {
    getPlayers() {return [];}
    getTeams() {return [];}
    getGames() {return [];}
    getDashboard() {return [];}

    addPlayer(player) {return player;}
    addTeam(team) {return team;}

    deletePlayer(id) {return true;}
    deleteTeam(id) {return true;}

    updatePlayer(player) {return player;}
    updateTeam(team) {return team;}
}

module.exports = DbDriver;
