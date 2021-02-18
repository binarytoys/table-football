class DbDriver {

    constructor() {
        if (this.constructor === DbDriver) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    getPlayers() { throw new Error("Method 'getPlayers()' must be implemented."); }
    getTeams() { throw new Error("Method 'getTeams()' must be implemented."); }
    getGames() { throw new Error("Method 'getGames()' must be implemented."); }
    getDashboard() { throw new Error("Method 'getDashboard()' must be implemented."); }
    getGame(id) { throw new Error("Method 'getGame(id)' must be implemented."); }
    getPlayerHistory(id) { throw new Error("Method 'getPlayerHistory(id)' must be implemented."); }

    addPlayer(player) { throw new Error("Method 'addPlayer(player)' must be implemented."); }
    addTeam(team) { throw new Error("Method 'addTeam(team)' must be implemented."); }
    addGame(game) { throw new Error("Method 'addGame(game)' must be implemented."); }
    addGoal(goal) { throw new Error("Method 'addGoal(goal)' must be implemented."); }

    deletePlayer(id) { throw new Error("Method 'deletePlayer(id)' must be implemented."); }
    deleteTeam(id) { throw new Error("Method 'deleteTeam(id)' must be implemented."); }

    updatePlayer(player) { throw new Error("Method 'updatePlayer(player)' must be implemented."); }
    updateTeam(team) { throw new Error("Method 'updateTeam(team)' must be implemented."); }
    updateGame(game) { throw new Error("Method 'updateGame(game)' must be implemented."); }
}

module.exports = DbDriver;
