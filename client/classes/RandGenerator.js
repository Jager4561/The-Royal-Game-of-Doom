class Generator
{
	constructor()
	{
		this.sum = 0;
		this.valSet = [0, 0, 0, 0];
		this.frames = 11;
		this.active = 0;
	}
	generate()
	{
		this.sum = 0;
		for(var i = 0; i < 4; i++)
		{
			this.valSet[i] = Math.floor(Math.random()*4);
			if(this.valSet[i] > 0)
				this.valSet[i] = 1;
			this.sum += this.valSet[i];
		}
		return this.sum;
	}
	getValSet()
	{
		return this.valSet;
	}
	reset()
	{
		this.sum = 0;
		this.valSet = [0, 0, 0, 0];
	}
	animate()
	{
		if(this.active === 1)
		{
			if(this.frames <= 10)
			{
				this.generate()
				//animate
				this.frames++;
			}
			else
			{
				engine.state = 1;
				this.active = 0;
				engine.update();
			}
		}
	}
	startAnimation()
	{
		this.frames = 0;
		this.active = 1;
	}
}