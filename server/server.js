// Modules import
const express = require('express');
const WebSocket = require("ws");
const User = require("./users.js");
const utils = require("./utils.js");
const rServ = require("./request_service.js");

console.log(utils.logMessage("Starting server..."));

const socket = new WebSocket.Server({ port: 45602 });

global.player1 = null;
global.player2 = null;
global.spectators = [];
global.clientId = 0;

console.log(utils.logMessage("Listening for connections..."));

socket.on("connection", ws => {
    console.log(utils.logMessage("New client connected, waiting for user info..."));

    ws.onmessage = (msg) => {
        var request = JSON.parse(msg.data);
        switch(request['type'])
        {
            case 1:
            {
                var result = rServ.addUser(request, clientId, ws);
                ws.send(JSON.stringify(result));
                if(result['error'] == true)
                {
                    ws.close();
                }
                break;
            }
            case 2:
            {
                if((request['data']['userId'] != global.player1.uid) && (request['data']['userId'] != global.player2.uid))
                {
                    var errCode = "Error: Data send not from player!";
                }
                else
                {
                    gameProgress = "Sth";
                    global.player1.connection.send(gameProgress);
                    global.player2.connection.send(gameProgress);
                    spectators.forEach(spectator => {
                        spectator.connection.send(gameProgress);
                    });
                }
                
            }
            default:
            {
                console.log(utils.logMessage("Warning: unrecognized request from client!"));
                break;
            }
        }
    };
    

    ws.on("close", () => {
        if((player1 !== null) && (JSON.stringify(player1.connection) == (JSON.stringify(ws))))
        {
            console.log(utils.logMessage("Player 1 with id: " + global.player1.uid + " disconnected."));
            player1 = null;
        }
        else if((player2 !== null) && (JSON.stringify(player2.connection) == (JSON.stringify(ws))))
        {
            console.log(utils.logMessage("Player 1 with id: " + global.player2.uid + " disconnected."));
            player2 = null;
        }
        else
        {
            spectators.forEach(spectator => {
                if((JSON.stringify(spectator.connection) == JSON.stringify(ws)))
                {
                    console.log(utils.logMessage("Spectator with id: " + spectator.uid + " disconnected."));
                    spectator = null;
                }
            });
        }
        console.log(utils.logMessage("Somebody disconnected from server."));
    });
});