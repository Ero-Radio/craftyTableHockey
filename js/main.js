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
Crafty.e("lGoal, 2D, DOM, Collision")
	.attr({
		x:10,
		y:220,
		w:goalWidth,
		h:goalHeight,
	});


////////////////
// Right Goal //
////////////////
Crafty.e("rGoal, 2D, DOM, Collision")
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
    .attr({ x: 40, y: 95, w: width/2, h: height, score: 0 })
    .text("0")
    .textColor('rgba(0,0,0,0.2)')
    .textFont({size:"400px", weight:"bold"})
    .unselectable();

/////////////////
// Right Score //
/////////////////
Crafty.e("rScore, DOM, 2D, Text")
    .attr({ x: width-500, y: 95, w: width/2, h: height, score: 0 })
    .text("0")
    .css({ "text-align": "right"})
    .textColor('rgba(0,0,0,0.2)')
    .textFont({size:"400px", weight:"bold"})
    .unselectable();

//////////
// Puck //
//////////
Crafty.sprite("images/pluck.png", {pluck:[0,0,20,20]});
Crafty.e("Pluck, pluck, DOM, Collision")
	.attr({
		x:300,
		y:300,
		w:20,
		h:20,
		dX: Crafty.math.randomNumber(2,7),
		dY: Crafty.math.randomNumber(2,7),

	})
	.bind("EnterFrame", function(){

		if(this.y < 30 || this.y >height-50){
			dm = getDificultyMultiplier();
			ndY = this.dY * Crafty.math.randomNumber(-0.8,-1.2)*dm;
			this.dY = ndY < 9*dm ? ndY : ndY/2;
		}

		if(this.x < 30 || this.x >width-50){
			if(this.y<220 || this.y>440){
				dm = getDificultyMultiplier();
				ndX = this.dX * Crafty.math.randomNumber(-0.8,-1.2)*dm;
				this.dX = ndX < 9*dm ? ndX : ndX/2;
			}
		}

		if(this.y < 0 || this.y > height || this.x < 0 || this.x > width){
			this.x = width/2;
			this.y = height/2;
		}

		this.x += this.dX;
		this.y += this.dY;
	})
	.onHit("lGoal", function(){
		this.x = width/2;
		this.y = height/2;
		this.dX *=-1;
		Crafty("rScore").each(function(){
			this.score++;
			this.text(this.score);
		});
	})
	.onHit("rGoal", function(){
		this.x = width/2;
		this.y = height/2;
		this.dX *=-1;
		Crafty("lScore").each(function(){
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
	})
	.checkHits("Pluck")
	.bind("HitOn", function(){
		pluck = Crafty("pluck");
		if(this._x < pluck._x && this._x+this._w > pluck._x){
			pluck.dY *=-1;
		}
		else if(this._y < pluck._y && this._y+this._h > pluck._y){
			pluck.dX *=-1;
		}
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
		pBat.x = Crafty.mousePos.x+40;
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
	})
	.bind("EnterFrame", function(){
		pluck = Crafty("pluck");
		rScore = Crafty("rScore").score > 0 ? Crafty("rScore").score : 1;
		lScore = Crafty("lScore").score > 0 ? Crafty("lScore").score : 1;
		speedMultiplier = lScore/rScore;
		dSpeed = Crafty.math.randomNumber(0.5, 1);

		direction = (pluck.y - this.y)/Math.abs(pluck.y - this.y);

		this.y += direction * dSpeed * speedMultiplier;


	})
	.checkHits("Pluck")
	.bind("HitOn", function(){
		pluck = Crafty("pluck");
		if(this._x < pluck._x && this._x+this._w > pluck._x){
			pluck.dY *=-1;
		}
		else if(this._y < pluck._y && this._y+this._h > pluck._y){
			pluck.dX *=-1;
		}
	});

	function getDificultyMultiplier(){
		rScore = Crafty("rScore").score > 0 ? Crafty("rScore").score : 1;
		lScore = Crafty("lScore").score > 0 ? Crafty("lScore").score : 1;
		dificultyMultiplier = lScore/rScore;
		return 0.9 + dificultyMultiplier * 0.1;
	}