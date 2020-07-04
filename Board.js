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
		var row = document.getElementById('rowP2').childNodes;
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
		var row = document.getElementById('warZone').childNodes;
		for(var i = 0; i < 8; i++)
		{
			document.write(i, ": ", row[i].innerHTML,"<br/>");
			if(board1[i+4] === '0')
				row[i].innerHTML="";
			else
				row[i].innerHTML=board1[i+4];
			document.write(i, ": ", row[i].innerHTML,"<br/>");
		}
		
		//row3 -> rowP3
		var row = document.getElementById('rowP1').childNodes;
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
}