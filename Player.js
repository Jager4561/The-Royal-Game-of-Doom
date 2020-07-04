class Player
{
	constructor(userId)
	{
		this.id = userId;
		this.pieces = 7;
		this.score = 0;
		this.board = ['0','0','0','0','0','0','0','0','0','0','0','0','0','0'];
		//             0   1   2   3 | 4   5   6   7   8   9   10  11| 12  13
	}
	getId()
	{
		return this.id;
	}
	ScorePoint()
	{
		this.score += 1;
	}
	getScore()
	{
		return this.score;
	}
	LosePiece()
	{
		this.pieces += 1; 
	}
	PlacePiece()
	{
		this.pieces -= 1; 
	}
	getNumOfPieces()
	{
		return this.pieces;
	}
	updateBoard(enemyMove)
	{
		if((enemyMove.pos > 3) && (enemyMove.pos < 12))
			this.board[enemyMove.pos] = '0';
		var boardSquare = this.board[enemyMove.newPos];
		if((enemyMove.newPos < 12) && (enemyMove.newPos > 3))
		{
			if(this.board[enemyMove.newPos] === 'f')
				this.LosePiece();
			this.board[enemyMove.newPos] = 'e';
		}
	}
	getBoard()
	{
		return this.board;
	}
	canMove(moveDist)
	{
		if((this.pieces > 0) && (this.board[moveDist-1] === '0'))
			return true;
		for(var i=0;i<14;i++)
		{
			if(this.board[i] === 'f')
			{
				if(i+moveDist-1 < 14)
				{
					if(this.board[i+moveDist-1] === '0')
						return true;
					if(this.board[i+moveDist-1] === 'e')
					{
						if(!(i+moveDist-1 === 7))
							return true;
					}
				}
				else if(i+moveDist-1 === 14)
					return true;
			}
		}
		return false;
	}
	
	
	
	
	
}