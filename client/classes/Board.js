class Board
{
	//most of it is for drawing
	constructor()
	{
		//I don't know for now
	}
	update(board1, board2)
	{
		//row1 -> rowP2
		var row = document.querySelectorAll("#rowP2 th");
		for(var i = 0; i < 4; i++)
		{
			if(board2[3-i] === 'f')
				row[i].innerHTML="e";
			else
				row[i].innerHTML="";
		}
		for(var i = 6; i < 8; i++)
		{
			if(board2[i+6] === 'f')
				row[i].innerHTML="e";
			else
				row[i].innerHTML="";
		}
		
		//row2 -> warZone
		row = document.querySelectorAll("#warZone th");
		for(var i = 0; i < 8; i++)
		{
			if(board1[i+4] === '0')
				row[i].innerHTML="";
			else
				row[i].innerHTML=board1[i+4];
		}
		
		//row3 -> rowP3
		row = document.querySelectorAll("#rowP1 th");
		for(var i = 0; i < 4; i++)
		{
			if(board1[3-i] === 'f')
				row[i].innerHTML="f";
			else
				row[i].innerHTML="";
		}
		for(var i = 6; i < 8; i++)
		{
			if(board1[i+6] === 'f')
				row[i].innerHTML="f";
			else
				row[i].innerHTML="";
		}
	}
	clear()
	{
		//var row1 = document.querySelectorAll("#rowP2 th");
		var row2 = document.querySelectorAll("#rowP1 th");
		var row3 = document.querySelectorAll("#warZone th");
		for(var i=0; i<8; i++)
		{
			//row1[i].style.pointerEvents = 'none';
			//row1[i].style.filter="brightness(100%)";
			
			row2[i].style.pointerEvents = 'none';
			row2[i].style.filter="brightness(100%)";
			
			row3[i].style.pointerEvents = 'none';
			row3[i].style.filter="brightness(100%)";
		}
	}
}