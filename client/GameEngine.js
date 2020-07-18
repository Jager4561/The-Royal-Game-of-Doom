class Move
{
	constructor(userId, pos, newPos, dist)
	{
		this.userId = userId;
		this.pos = pos;
		this.newPos = newPos;
		this.dist = dist;
	}
}
class GameEngine
{
	constructor()
	{
		this.round = 0;
		// { NewGame = 0, roundP1 = 1, roundP2 = 2, spectatorMode = 3}
		this.stage = 0;
		// active: { NewRound = 0, ThrewDices = 1, SelectedPiece = 2, MadeMove = 3}
		// pasive: { roundP1 = 1, roundP2 = 2}
	}
	
	// setting up function
	initialize()
	{
		// get from server player1
		player1 = getPlayer(1);
		
		// get from server player2 
		player2 = getPlayer(2);
		
		if(checkIfUser(player2))
		{
			this.round = 2;
			temp = player1;
			player1 = player2;
			player2 = temp;
		}
		else if(checkIfUser(player1))
		{
			this.round = 1;
		}
		else
		{
			this.round = 3;
			this.stage = 1;
		}
	}
	
	update()
	{
		if(this.round === 1)
		{
			if(this.stage === 0)
			{
				//ready to make new move
				
			}
			else if(this.stage === 1)
			{
				// selecting move
				move = new Move(player1.getId(),0,0,move.sum);
				if(player1.canMove(move.sum))
				{
					this.activatePosMoves(player1);
				}
				else
				{
					// no possible moves
					move = new Move(player1.getId(),0,0,0);
					player1.updateMyBoard(move);
					player2.updateBoard(move);
					this.round = 2;
					this.stage = 0;
					//send(move);
				}
			}
			else if(this.stage === 2)
			{
				// turn on posible spot
				this.deactiveBoard();
				document.getElementById(names[move.pos + 1]).style.filter="brightness(200%)";
				var pos = move.pos + move.dist;
				document.getElementById(names[pos + 1]).style.pointerEvents = 'all';
				document.getElementById(names[pos + 1]).style.filter="brightness(150%)";
				
			}
			else if(this.stage === 3)
			{
				this.deactiveBoard(board);
				player1.updateMyBoard(move);
				player2.updateBoard(move);
				this.round = 2;
				this.stage = 0;
				//send(move);
			}
			else
			{
				alert("Something went wrong!");
			}
			
			
		}
		else if(this.round === 2)
		{
			/*
			if(receivedMove())
			{
				move = receiveMove()
				player2.updateMyBoard(move);
				player1.updateBoard(move);
				this.round = 1;
			}
			
			*/
		}
		else if(this.round === 3)
		{
			//spectator
			/*
			if(this.stage === 1)
			{
				move = receiveMove()
				player1.updateMyBoard(move);
				player2.updateBoard(move);
				this.round = 2;
			}
			else if(this.stage === 2)
			{
				move = receiveMove()
				player2.updateMyBoard(move);
				player1.updateBoard(move);
				this.round = 1;
			}
			*/
		}
		else
		{
			//no game loaded
		}
	}
	deactiveBoard(board)
	{
		board.clear();
	}
	activatePosMoves(player)
	{
		if((player.getNumOfPieces() > 0) && (player.getBoard()[dist-1] === '0'))
		{
			document.getElementById("b1add").style.pointerEvents = 'all';
		}
		var tab = player.getBoard();
		for(var i = 0; i < 14; i++)
		{
			if(tab[i] === 'f' )
			{
				if(i+dist <= 14)
				{
					if(this.board[i+dist] === '0')
					{
						document.getElementById(names[i+1]).style.pointerEvents = 'all';
					}
					else if(this.board[i+moveDist] === 'e')
					{
						if(!(i+dist === 7))
						{
							document.getElementById(names[i+1]).style.pointerEvents = 'all';
						}
					}
				}
			}
		}	
	}
	checkMove()
	{
		if(move.newPos === (move.pos + move.dist))
		{
			// valid
			switch(move.newPos)
			{
				case 3:
				case 7:
				case 13:
				{
					this.state = 0;
					this.deactiveBoard();
					player1.updateMyBoard(move);
					player2.updateBoard(move);
					//send(move);
					
				}break;
				default:
				{
					this.state = 3;
				}
			}
		}
		else
		{
			// invalid
			move.pos = 0;
			move.newPos = 0;
			this.state = 1;
			alert("illegal move");
		}
	}
	
}

let move;
let names = ["b1add", "b1e1", "b1e2", "b1e3", "b1e4",
						 "wze5", "wze6", "wze7", "wze8", "wze9", "wze10", "wze11", "wze12",
						 "b1e13", "b1e14", "b1remove" ]

document.addEventListener('DOMContentLoaded', setup);
function setup()
{
	document.getElementById("throwBtn").onclick = function(event)
	{
		if((engine.round === 1) && (engine.stage === 0))
		{
			generator.startAnimation();
			engine.update();
		}
		else
		{
			alert("No more throws");
		}
		
	};
	
	
	// Board squares
	{
	document.getElementById("b1add").onclick = function(event)
	{
		document.getElementById("b1add").style.filter="brightness(150%)";
		if((engine.round === 1) && (engine.stage === 1))
		{
			move.pos = -1;// #id
			engine.stage = 2;
		}
		else if((engine.round === 1) && (engine.stage === 2))
		{
			move.newPos = -1;// #id
			engine.checkMove();
		}
		engine.update();
	}
	document.getElementById("b1e1").onclick = function(event)
	{
		document.getElementById("b1e1").style.filter="brightness(150%)";
		if((engine.round === 1) && (engine.stage === 1))
		{
			move.pos = 0;// #id
			engine.stage = 2;
		}
		else if((engine.round === 1) && (engine.stage === 2))
		{
			move.newPos = 0;// #id
			engine.checkMove();
		}
		engine.update();
	}
	document.getElementById("b1e2").onclick = function(event)
	{
		document.getElementById("b1e2").style.filter="brightness(150%)";
		if((engine.round === 1) && (engine.stage === 1))
		{
			move.pos = 1;// #id
			engine.stage = 2;
		}
		else if((engine.round === 1) && (engine.stage === 2))
		{
			move.newPos = 1;// #id
			engine.checkMove();
		}
		engine.update();
	}
	document.getElementById("b1e3").onclick = function(event)
	{
		document.getElementById("b1e3").style.filter="brightness(150%)";
		if((engine.round === 1) && (engine.stage === 1))
		{
			move.pos = 2;// #id
			engine.stage = 2;
		}
		else if((engine.round === 1) && (engine.stage === 2))
		{
			move.newPos = 2;// #id
			engine.checkMove();
		}
		engine.update();
	}
	document.getElementById("b1e4").onclick = function(event)
	{
		document.getElementById("b1e4").style.filter="brightness(150%)";
		if((engine.round === 1) && (engine.stage === 1))
		{
			move.pos = 3;// #id
			engine.stage = 2;
		}
		else if((engine.round === 1) && (engine.stage === 2))
		{
			move.newPos = 3;// #id
			engine.checkMove();
		}
		engine.update();
	}
	document.getElementById("wze5").onclick = function(event)
	{
		document.getElementById("wze5").style.filter="brightness(150%)";
		if((engine.round === 1) && (engine.stage === 1))
		{
			move.pos = 4;// #id
			engine.stage = 2;
		}
		else if((engine.round === 1) && (engine.stage === 2))
		{
			move.newPos = 4;// #id
			engine.checkMove();
		}
		engine.update();
	}
	document.getElementById("wze6").onclick = function(event)
	{
		document.getElementById("wze6").style.filter="brightness(150%)";
		if((engine.round === 1) && (engine.stage === 1))
		{
			move.pos = 5;// #id
			engine.stage = 2;
		}
		else if((engine.round === 1) && (engine.stage === 2))
		{
			move.newPos = 5;// #id
			engine.checkMove();
		}
		engine.update();
	}
	document.getElementById("wze7").onclick = function(event)
	{
		document.getElementById("wze7").style.filter="brightness(150%)";
		if((engine.round === 1) && (engine.stage === 1))
		{
			move.pos = 6;// #id
			engine.stage = 2;
		}
		else if((engine.round === 1) && (engine.stage === 2))
		{
			move.newPos = 6;// #id
			engine.checkMove();
		}
		engine.update();
	}
	document.getElementById("wze8").onclick = function(event)
	{
		document.getElementById("wze8").style.filter="brightness(150%)";
		if((engine.round === 1) && (engine.stage === 1))
		{
			move.pos = 7;// #id
			engine.checkMove();
		}
		else if((engine.round === 1) && (engine.stage === 2))
		{
			move.newPos = 7;// #id
			engine.checkMove();
		}
		engine.update();
	}
	document.getElementById("wze9").onclick = function(event)
	{
		document.getElementById("wze9").style.filter="brightness(150%)";
		if((engine.round === 1) && (engine.stage === 1))
		{
			move.pos = 8;// #id
			engine.stage = 2;
		}
		else if((engine.round === 1) && (engine.stage === 2))
		{
			move.newPos = 8;// #id
			engine.checkMove();
		}
		engine.update();
	}
	document.getElementById("wze10").onclick = function(event)
	{
		document.getElementById("wze10").style.filter="brightness(150%)";
		if((engine.round === 1) && (engine.stage === 1))
		{
			move.pos = 9;// #id
			engine.stage = 2;
		}
		else if((engine.round === 1) && (engine.stage === 2))
		{
			move.newPos = 9;// #id
			engine.checkMove();
		}
		engine.update();
	}
	document.getElementById("wze11").onclick = function(event)
	{
		document.getElementById("wze11").style.filter="brightness(150%)";
		if((engine.round === 1) && (engine.stage === 1))
		{
			move.pos = 10;// #id
			engine.stage = 2;
		}
		else if((engine.round === 1) && (engine.stage === 2))
		{
			move.newPos = 10;// #id
			engine.checkMove();
		}
		engine.update();
	}
	document.getElementById("wze12").onclick = function(event)
	{
		document.getElementById("wze12").style.filter="brightness(150%)";
		if((engine.round === 1) && (engine.stage === 1))
		{
			move.pos = 11;// #id
			engine.stage = 2;
		}
		else if((engine.round === 1) && (engine.stage === 2))
		{
			move.newPos = 11;// #id
			engine.checkMove();
		}
		engine.update();
	}
	document.getElementById("b1e13").onclick = function(event)
	{
		document.getElementById("b1e13").style.filter="brightness(150%)";
		if((engine.round === 1) && (engine.stage === 1))
		{
			move.pos = 12;// #id
			engine.stage = 2;
		}
		else if((engine.round === 1) && (engine.stage === 2))
		{
			move.newPos = 12;// #id
			engine.checkMove();
		}
		engine.update();
	}
	document.getElementById("b1e14").onclick = function(event)
	{
		document.getElementById("b1e14").style.filter="brightness(150%)";
		if((engine.round === 1) && (engine.stage === 1))
		{
			move.pos = 13;// #id
			engine.stage = 2;
		}
		else if((engine.round === 1) && (engine.stage === 2))
		{
			move.newPos = 13;// #id
			engine.checkMove();
		}
		engine.update();
	}
	document.getElementById("b1remove").onclick = function(event)
	{
		document.getElementById("b1remove").style.filter="brightness(150%)";
		if((engine.round === 1) && (engine.stage === 1))
		{
			move.pos = 14;// #id
			engine.stage = 2;
		}
		else if((engine.round === 1) && (engine.stage === 2))
		{
			move.newPos = 14;// #id
			engine.checkMove();
		}
		engine.update();
	}
	}
}