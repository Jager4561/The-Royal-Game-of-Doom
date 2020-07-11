const User = require('./users.js');
const utils = require("./utils.js");

const addUser = (request, clientId, conn) => {
    switch (request['data']['connAs'])
    {
        case 'player1':
        {
            if(global.player1 !== null)
            {
                var response = {
                    'type': 1,
                    'error': true,
                    'data': {
                        'errCode': 'Player1 already exist!'
                    }
                }
                console.log(utils.logMessage("Warning: Could not create new user, player1 already exixsts!"));
            }
            else
            {
                global.player1 = new User(clientId, request['data']['userName'], conn);
                var response = {
                    'type': 1,
                    'error': false,
                    'data': {
                        'userId': clientId,
                        'userName': request['data']["userName"],
                        'connAs': 'player1'
                    }
                }
                console.log(utils.logMessage("Created new player1 with id: " + clientId));
                global.clientId++;
            }  
            break;
        }
        case 'player2':
        {
            if(global.player2 !== null)
            {
                var response = {
                    'type': 1,
                    'error': true,
                    'data': {
                        'errCode': 'Player2 already exist!'
                    }
                }
                console.log(utils.logMessage("Warning: Could not create new user, player2 already exixsts!"));
            }
            else
            {
                global.player2 = new User(clientId, request['data']['userName'], conn);
                var response = {
                    'type': 1,
                    'error': false,
                    'data': {
                        'userId': clientId,
                        'userName': request['data']['userName'],
                        'connAs': 'player2'
                    }
                }
                console.log(utils.logMessage("Created new player2 with id: " + clientId));
                global.clientId++;
            }  
            break;
        }
        default:
        {
            global.spectators.push(new User(clientId, request['data']['userName'], conn));
            var response = {
                'type': 1,
                'error': false,
                'data': {
                    'userId': clientId,
                    'userName': request['data']['userName'],
                    'connAs': 'spectator'
                }
            }
            console.log(utils.logMessage("Created new spectator with id: " + clientId));
            global.clientId++;
            break;
        }
    }
    return response;
};

module.exports = {
    addUser
};