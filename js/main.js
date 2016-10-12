//Iphone4 standart
var width = 960;
var height = 640;

Crafty.init(width, height, document.getElementById("game"))
	.bind("MouseMove", function(e){
		Console.log("wololo");
	});

var goalWidth = 10;
var goalHeight = 200;

///////////////
// Left goal //
///////////////
Crafty.e("lGoal, 2D, DOM, Collision, Color")
	.color("rgb(255,255,0)")
	.attr({
		x:10,
		y:220,
		w:goalWidth,
		h:goalHeight,
	});


////////////////
// Right Goal //
////////////////
Crafty.e("rGoal, 2D, DOM, Collision, Color")
	.color("rgb(255,255,0)")
	.attr({
		x:width-goalWidth-10,
		y:220,
		w:goalWidth,
		h:goalHeight,
	});

////////////////
// Left Score //
////////////////
Crafty.e("lScore, DOM, 2D, Text")
    .attr({ x: 40, y: 95, w: 2, h: 2, score: 0 })
    .text("0")
    .textColor('rgba(0,0,0,0.2)')
    .textFont({size:"400px", weight:"bold"})
    .unselectable();

/////////////////
// Right Score //
/////////////////
Crafty.e("rScore, DOM, 2D, Text")
    .attr({ x: width-310, y: 95, w: 2, h: 2, score: 0 })
    .text("0")
    .textColor('rgba(0,0,0,0.2)')
    .textFont({size:"400px", weight:"bold"})
    .unselectable();


//////////
// Puck //
//////////
Crafty.e("2D, DOM, Color, Collision")
	.color("rgb(255,0,255)")
	.attr({
		x:300,
		y:300,
		w:20,
		h:20,
		dX: Crafty.math.randomNumber(1,5),
		dY: Crafty.math.randomNumber(1,5),

	})
	.bind("EnterFrame", function(){

		if(this.y < 30 || this.y >height-50){
			ndY = this.dY * Crafty.math.randomNumber(-0.8,-1.2);
			this.dY = ndY < 6.1 ? ndY : ndY/2;
		}

		if(this.x < 30 || this.x >width-50){
			if(this.y<220 || this.y>440){
				ndX = this.dX * Crafty.math.randomNumber(-0.8,-1.2);
				this.dX = ndX < 6.1 ? ndX : ndX/2;
			}
		}
		this.x += this.dX;
		this.y += this.dY;
	})
	.onHit("Bat", function(){
		ndX = this.dX * Crafty.math.randomNumber(-0.8,-1.2);
		this.dX = ndX < 6.1 ? ndX : ndX/2;
	})
	.onHit("lGoal", function(){
		this.x = width/2;
		this.y = height/2;
		this.dX *=-1;
		Crafty("lScore").each(function(){
			this.score++;
			this.text(this.score);
		});
	})
	.onHit("rGoal", function(){
		this.x = width/2;
		this.y = height/2;
		this.dX *=-1;
		Crafty("rScore").each(function(){
			this.score++;
			this.text(this.score);

		});

	});


////////////////
// Player Bat //
////////////////
Crafty.e("pBat, Bat, 2D, DOM, Color, Collision")
	.color("rgb(255,255,0)")
	.attr({
		x:200,
		y:200,
		w:40,
		h:40,
	});

/////////////////////
// Player Bat Area //
/////////////////////
Crafty.e("pBatArea, 2D, DOM, Mouse")
	.attr({
		x:0,
		y:0,
		w:width/2,
		h:height
	})
	.bind("MouseMove", function(){
		pBat = Crafty("pBat");
		pBat.x = Crafty.mousePos.x-20;
		pBat.y = Crafty.mousePos.y-20;
	});

////////////
// IA Bat //
////////////
Crafty.e("Bat, 2D, DOM, Color, Collision")
	.color("rgb(255,255,0)")
	.attr({
		x:800,
		y:200,
		w:40,
		h:40,
	});