BasicGame.Game = function(game) {
  // When a State is added to Phaser it automatically has the following
  // properties set on it, even if they already exist:
  this.game; // a reference to the currently running game
  this.add; // used to add sprites, text, groups, etc
  this.camera; // a reference to the game camera
  this.cache; // the game cache
  this.input; // the global input manager (you can access this.input.keyboard,
  // this.input.mouse, as well from it)
  this.load; // for preloading assets
  this.math; // lots of useful common math operations
  this.sound; // the sound manager - add a sound, play one, set-up markers,
  // etc
  this.stage; // the game stage
  this.time; // the clock
  this.tweens; // the tween manager
  this.world; // the game world
  this.particles; // the particle manager
  this.physics; // the physics manager
  this.rnd; // the repeatable random number generator
  // You can use any of these from any function within this State.
  // But do consider them as being 'reserved words', i.e. don't create a
  // property for your own game called "world" or you'll over-write the world
  // reference.
};
BasicGame.Game.prototype = {
  dropRate:0.2,
  hitGiftIndex: null,
  hitGift: null,
  catchAssist:false,
  claw : null,
  claw_length : 520,
  dollOffsetX: 75,
  dollOffsetY: 75,
  ovalWidth: 320,
  ovalHeight: 40,
  claw_state : 0,
  claw_speed : 5,
  rotate_speed: 2,
  claw_rope:null,
  claw_pip:null,
  claw_box:null,
  rotateup: true,
  zero_point : [420,0],
  gifts : null,
  layer : null,
  sfx_win : null,
  sfx_lose : null,
  bgm : null,
  sfx_claw : [],
  score_text:null,
  max_doll:9,
  score:0,
  coin:0,
  timer:null,
  tileObjects:null,
  claw_sfx : function(index) {
    for ( var i in this.sfx_claw) {
      var sfx = this.sfx_claw[i];
      if (i == index) {
        sfx.loopFull();
      } else {
        sfx.stop();
      }
    }
  },
  click : function() {
    if (this.claw_state === 0) {

      this.claw_state = 1;
      this.claw_sfx(0);
    }
  },
  release : function() {
    if (this.claw_state === 1) {
      this.claw_state = 2;
      this.claw_sfx(1);
    }
  },
  spawnDoll: function(x, y, rotateup,back) {
    var index = Math.round(Math.random()+1);
    var gift = this.gifts.create(x - this.dollOffsetX, y - this.dollOffsetY, 'sprites',index + ".png");
    gift.frameIndex = index;
    gift.rotateup = rotateup;
    if(back){
      gift.sendToBack();
    }
  },
  closeClaw : function(isClose) {
    console.log(isClose)
    if (isClose) {
      this.claw.loadTexture('claw_closed');
      var seed = Math.floor(Math.random()*this.max_doll)
      var gift = this.gifts.removeChildAt(seed);
      console.log(gift)
      this.hitGift = this.game.add.sprite(580 - this.dollOffsetX, 690,
        'sprites', gift.frameIndex + '.png');
      this.hitGiftIndex = gift.frameIndex;
      this.game.world.bringToTop(this.gifts);
      this.sfx_win.play();
    } else {
      this.claw.loadTexture('claw');
    }

  },


  create : function() {
    this.background = this.add.sprite(0, 0, 'preloaderBackground');

    this.bgm = this.game.add.audio('bgm');
    this.bgm.loopFull();
    this.sfx_claw[0] = this.game.add.audio('sfx_claw_0');
    this.sfx_claw[1] = this.game.add.audio('sfx_claw_1');
    this.sfx_claw[2] = this.game.add.audio('sfx_claw_2');
    this.sfx_win = this.game.add.audio('win');

    this.gifts = this.game.add.group();


    this.claw = this.gifts.create(this.zero_point[0], this.zero_point[1], 'claw');

    this.closeClaw(false);
    this.claw_rope = this.game.add.sprite(this.zero_point[0] + 100, this.zero_point[1], 'claw_rope');
    // attach pointer events
    this.game.input.onDown.add(this.click, this);
    this.game.input.onUp.add(this.release, this);
    for(var i = 0; i< this.max_doll; i++){
      var x,y,rotateup;
      if(i < this.max_doll/2){

        rotateup = false;

        x = 600 - this.ovalWidth + (this.ovalWidth*2/Math.floor(this.max_doll/2))*i;
        y = 700 - Math.sqrt((this.ovalWidth*this.ovalWidth*this.ovalHeight*this.ovalHeight - this.ovalHeight*this.ovalHeight*(x -600)*(x -600))/(this.ovalWidth*this.ovalWidth));
        this.spawnDoll(x, y, rotateup, false);
      }else{
        rotateup = true;
        x = 600 + this.ovalWidth - (this.ovalWidth*2/Math.floor(this.max_doll/2 + 1)) * (i - Math.floor(this.max_doll/2))
        y = 700 + Math.sqrt((this.ovalWidth*this.ovalWidth*this.ovalHeight*this.ovalHeight - this.ovalHeight*this.ovalHeight*(x -600)*(x -600))/(this.ovalWidth*this.ovalWidth));
        this.spawnDoll(x, y, rotateup, true);
      }
      console.log(x, y);


    }
    console.log(this.gifts.children[0])
    this.coin = 50;
    console.log("starting play state");
  },
  update : function() {
    for ( var i in this.gifts.children) {
      var gift = this.gifts.children[i];

      if(gift.key === 'sprites'){
        if(gift.x >= (600 + this.ovalWidth - this.dollOffsetX)){
          gift.rotateup = true;
          gift.sendToBack();
        }else if(gift.x <= (600 - this.ovalWidth - this.dollOffsetX)){
          gift.bringToTop();
          gift.rotateup = false;
        }
        if(!gift.rotateup){
          gift.x += this.rotate_speed;
          gift.y = 700 + Math.sqrt((this.ovalWidth*this.ovalWidth*this.ovalHeight*this.ovalHeight - this.ovalHeight*this.ovalHeight*(gift.x + this.dollOffsetX -600)*(gift.x + this.dollOffsetX -600))/(this.ovalWidth*this.ovalWidth)) - this.dollOffsetY;
        }else if(gift.rotateup){
          gift.x -= this.rotate_speed;
          gift.y = 700 - Math.sqrt((this.ovalWidth*this.ovalWidth*this.ovalHeight*this.ovalHeight - this.ovalHeight*this.ovalHeight*(gift.x + this.dollOffsetX -600)*(gift.x + this.dollOffsetX -600))/(this.ovalWidth*this.ovalWidth)) - this.dollOffsetY;
        }
      }

    }
    if (this.claw_state == 2) {
      this.rotate_speed = 10;
      this.claw.y += this.claw_speed;
      this.claw_rope.height += this.claw_speed;
      if (this.claw.y >= this.claw_length) {
        this.closeClaw(true);
        this.claw_state = 3;
        this.claw_sfx(2);
      }
    } else if (this.claw_state == 3) {
      this.claw.y -= this.claw_speed;
      this.claw_rope.height -= this.claw_speed;

      if (this.hitGift) {
        this.hitGift.y -= this.claw_speed;
      }
      if (this.claw.y <= this.zero_point[1]) {
        this.claw.y = this.zero_point[1];
        this.claw_state = 4;
      }
    } else if (this.claw_state == 4) {
      this.rotate_speed = 2;
      this.claw_state = 0;
      this.claw_sfx(-1);
      this.closeClaw(false);
      this.quitGame();
    }
    if (this.hitGift) {
      var seed = Math.random();
      // console.log("SEED:" + seed);

    }else if((this.claw_state == 3 || this.claw_state == 4) && this.game.time.now % 30 == 0){
            var seed = Math.random();
            if (seed <= this.dropRate && seed > 0) {
            }
    }

  },
  quitGame : function(pointer) {
    // Here you should destroy anything you no longer need.
    // Stop music, delete sprites, purge caches, free resources, all that
    // good stuff.
    // Then let's go back to the main menu.
    this.state.start('MainMenu', true, false, this.hitGiftIndex);
  }
};

