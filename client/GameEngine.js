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
		this.flag = 0;
		this.stage = 0;
	}
	run()
	{
		if(this.flag === 1)
		{
			var moveDist = generator.generate();
			if(player1.canMove(moveDist))
			{
				
			}
			else
			{
				var move = new Move(player1.getId(),0,0,0);
				player1.updateMyBoard(move);
				player2.updateBoard(move);
				this.flag = 2;
				//sent(move);
			}
		}
		else if(this.flag === 2)
		{
			//receive(move);
			player2.updateMyBoard(move);
			player1.updateBoard(move);
			this.flag = 1;
		}
		else
		{
			//not loaded/spectator
		}
	}
}

let move;

document.addEventListener('DOMContentLoaded', setup);

function setup()
{
	document.getElementById("throwBtn").onclick = function(event)
	{
		if(engine.stage === 0)
		{
			move = new Move(player1.getId(), 0, 0, generator.generate());
			engine.stage = 1;
			console.log("New:" + move.dist);
		}
		else
		{
			alert("No more throws");
		}
		
	};
	
	document.getElementById("selectBtn").onclick = function(event)
	{
		if(engine.stage === 1)
		{
			//if()
		}
	};
	
	document.getElementById("moveBtn").onclick = function(event)
	{
		if(engine.stage === 2)
		{
			
		}
	};
}