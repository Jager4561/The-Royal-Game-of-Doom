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
		if(enemyMove.pos > 3)
			this.board[enemyMove.pos] = '0';
		var boardSquare = this.board[enemyMove.newPos];
		if((boardSquare < 12) && !(boardSquare === -1))
		{
			if(boardSquare === 'f')
				this.LosePiece();
			this.board[enemyMove.newPos] = 'e';
		}
	}
	getBoard()
	{
		return this.board;
	}
}