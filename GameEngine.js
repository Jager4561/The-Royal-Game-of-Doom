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
		this.flag=0;
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
				player2.update(move);
				this.flag = 2;
				//sent(move);
			}
		}
		else if(this.flag === 2)
		{
			//wait for move
		}
		else
		{
			
		}
	}
}

