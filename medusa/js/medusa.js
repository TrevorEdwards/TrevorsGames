var gamewidth = 800;
var gameheight = 600;
var game = new Phaser.Game(gamewidth, gameheight, Phaser.AUTO, 'Medusa');


//Global vars
var BOX_SIZE = 16;
var TAIL_SIZE = 8;
var PERIOD = 3.14159;
var SPIT_SPEED = 370;
var CAT_INTERVAL = 6;

var cats = 0;
var spit = "";
var cat;
var scoret;
var hscoret;

//Stat vars
var high_score = 0;
var score = 0;

var text_style = {
	font: "20px Impact",
	fill: "#ffff00",
	align: "center"
}
var text_style_big = {
	font: "72px Impact",
	fill: "#ffff00",
	align: "center"
}
var score_style = {
	font: "26px Impact",
	fill: "#00ff00",
	align: "center"
}




var load_state = {

	preload: function() {
		game.load.spritesheet('button','res/start.png',400, 200);
		game.load.image('doge','res/doge.png');
		game.load.image('doges','res/doges.png');
		game.load.image('snake','res/thebox.png');
		game.load.image('cat','res/cat.png');
		game.load.audio('meow', 'res/meow.wav');
		game.load.audio('gameover', 'res/gameover.wav');

		meow = game.add.audio('meow');
		gameover = game.add.audio('gameover');
	},

	create: function(){
		game.add.text(game.world.centerX,game.world.centerY,"Loading...", text_style);
		game.state.start('menu');
	}

}

var menu_state = {

	create: function(){
		this.game.stage.backgroundColor = '#cc0033';
		var t = game.add.text(game.world.centerX-150,game.world.centerY-200, 'Medusa', text_style_big);
		button1 = game.add.button(game.world.centerX - 200, game.world.centerY, 'button', function() { diff = 0; game.state.start('play');}, this, 0,0,0,0);
		game.input.keyboard.addCallbacks(this,null,null,function(key) { if( key == 'q') {op = ""; game.state.start('menu');}} );
	}


}

var play_state = {

	preload: function(){

		//Time
		game.time.advancedTiming = true;
		firstnow = game.time.now;
		jumpstart = firstnow;

		cats = -1;
		score = 0;
	},

	create: function(){
		this.game.stage.backgroundColor = '#000000';

		//Physics Initiate
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//Cat stuff
		catg = game.add.group();
		catg.enableBody = true;

		//Parallax background
		paralax2 = game.add.tileSprite(0, 0, 1600, 600, 'doges');
		paralax1 = game.add.tileSprite(0, 0, 2400,  128, 'doge');
		paralax11 = game.add.tileSprite(0, 472, 2400,  128, 'doge');
		paralax2.alpha = .1;

		//Score tracker
		scoret = game.add.text(25,560,"Score: 0", score_style);
		hscoret = game.add.text(160,560,"High Score: "+high_score, score_style);

		//Snake spitting
		game.input.onDown.add( function(pointer) {
				if( spit === "" || spit.exists === false){
					//Create spit
					spit = game.add.sprite( snake.x,snake.y,'snake');
					spit.tint = 0x0000ff;
					game.physics.arcade.enable(spit);
					spit.scale.setTo(BOX_SIZE, BOX_SIZE);
					spit.checkWorldBounds = true;
					spit.events.onOutOfBounds.add(gameOver, this);

					//Move spit
					var ref = tails[0];
					var ang = Math.atan2((ref.position.y+TAIL_SIZE/2)-(snake.position.y+BOX_SIZE/2),(ref.position.x-TAIL_SIZE/2)-(snake.position.x-BOX_SIZE/2) ) + Math.PI;
					spit.body.velocity.x = SPIT_SPEED * Math.cos(ang);
					spit.body.velocity.y = SPIT_SPEED * Math.sin(ang);
				}
			},this);

		//Initiate Snake
		snake = game.add.sprite(  140 - BOX_SIZE / 2, 300- BOX_SIZE / 2,'snake');
		game.physics.arcade.enable(snake);
		snake.scale.setTo(BOX_SIZE, BOX_SIZE);
		snake.tint = 0x00cc00;

		//Snake tail
		tails = new Array();
		for( var i = 1; i < 20; i++){
			var	tail = game.add.sprite(  130 - (i * (TAIL_SIZE)) - TAIL_SIZE / 2, 300- TAIL_SIZE / 2,'snake');
			game.physics.arcade.enable(tail);
			tail.scale.setTo(TAIL_SIZE, TAIL_SIZE);
			tail.tint = 0x00cc00;
			tail.offy = i;
			tails.push( tail );
		}


	},

	update: function(){

		timeElapsed = elapsed();

		//Parallax
		(paralax2.x < -800) ? paralax2.x = 0 : false;
		(paralax1.x < -1024) ? paralax1.x = 0 : false;
		paralax2.x = paralax2.x - 2; //paralax2.y= game.camera.y*0.1+340;
		paralax1.x = paralax1.x - 1;
		paralax11.x = paralax1.x;

		//Snake
		snake.y = gameheight / 2 + Math.sin( (timeElapsed / 1000) / (PERIOD/ (2 * Math.PI)) ) * 150;

		tails.forEach( function( tl ){
			tl.y = gameheight / 2 + Math.sin( (timeElapsed / 1000) / (PERIOD / (2 * Math.PI)) - tl.offy / 6 ) * 150;
		});

		// Cats
		if( Math.floor(timeElapsed / 1000) % CAT_INTERVAL == 0 && Math.floor(timeElapsed / 1000) / CAT_INTERVAL > cats){
			cats++;
			var py = Math.floor( Math.random() * 280 );
			cat = catg.create( 840,128 + py,'cat'	);
			cat.scale.setTo(2,2);
			game.physics.arcade.enable(cat);
			cat.checkWorldBounds = true;
			cat.events.onOutOfBounds.add(catOut, this);
		}

		if( cat != null){
			cat.x = cat.x - 3.3;
		}

		game.physics.arcade.overlap(spit, catg, spitter, null, this);
		game.physics.arcade.overlap(catg, snake, gameOver, null, this);

	},

	render: function(){

	}

}

//Helper functions
function elapsed(){
	firstnow = firstnow + game.time.elapsedSince(jumpstart);
	jumpstart = game.time.now;
	return firstnow / 100000000000;
}
function catOut( ca ){
	if( ca.x < 80){
		gameOver();
	}
}
function gameOver(){
	game.state.start('menu');
	gameover.play();
}
function spitter(spt, ct){
	meow.play();
	ct.kill();
	score++;
	scoret.setText("Score: "+score);
	if( high_score < score ){
		hscoret.setText("High Score: "+score);
		high_score = score;
	}
	spt.kill();
	spit = "";
}

// Include all states (At the bottom so that the vars are defined)
game.state.add('load', load_state);
game.state.add('menu', menu_state);
game.state.add('play', play_state);
game.state.start('load');
