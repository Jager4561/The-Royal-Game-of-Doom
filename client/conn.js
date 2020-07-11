const log = document.getElementById("game_log");
const joinButton = document.getElementById("join");
joinButton.style.pointerEvents = "none";

joinButton.addEventListener("click", () => {
    const userName = document.getElementById("username").value;
    const connAs = document.getElementById("conn_as").value;
    if(userName == "")
    {
        alert("Username is required!");
    }
    else
    {
        let initial = {
            'type': 1,
            'error': false,
            'data': {
                'userId': null,
                'userName': userName,
                'connAs': connAs
            }
        };
        socket.send(JSON.stringify(initial));
    } 
});

let userId = null;
let userName = null;
let role = null;

log.innerHTML += "Connecting to server...<br>";
const socket = new WebSocket("ws://127.0.0.1:45602");
socket.onopen = () => {
    log.innerHTML += "Connected to server!<br>";
    joinButton.style.pointerEvents = "all";
};

socket.onmessage = function (event) {
    const response = JSON.parse(event.data);
    console.log(response);
    if(response['type'] == 1 && response['error'] === false) 
    {
        userId = response['data']['userId'];
        userName = response['data']['userName'];
        role = response['data']['connAs'];
        document.getElementById("login_to_game").style.display = "none";
        document.getElementById("game_screen").style.display = "block";
        console.log(userId + " " + userName + " " + role);
    }
    else if(response['error'] === true)
    {
        alert(response['data']['errCode']);
        window.location.reload();
    }
};

socket.onerror = function (event) {
    log.innerHTML += "Error occured!<br>";
};

socket.addEventListener("close", function (e) {
    log.innerHTML += "Disconnected from server! Refresh website.<br>";
    joinButton.style.pointerEvents = "none";
});
