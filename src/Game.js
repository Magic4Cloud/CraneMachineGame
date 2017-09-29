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
  this.release;
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
  giftsobject: {},
  claw_length : 520,
  dollOffsetX: 75,
  winprize: 0,
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
  sfx_claw : [],
  score_text:null,
  time_text: null,
  max_doll:9,
  score:0,
  countdown: 30,
  coin:0,
  timer:null,
  tileObjects:null,
  click : function() {
    if (this.claw_state === 0) {

      this.claw_state = 1;
    }
  },
  release : function(userId, faceJson, result) {
    this.timer.stop();
    this.add.sprite(860, 52, 'topright');
    console.log(result)
    var ret = JSON.parse(result)
    console.log(ret)
    this.winprize = this.giftsobject[ret.retinfo.giftid];
    this.claw_state = 2;
  },

  spawnDoll: function(i, x, y, rotateup,back) {
    var index = Math.round(Math.random()+1);
    var gift = this.gifts.create(x - this.dollOffsetX, y - this.dollOffsetY, 'sprites' + i);
    gift.rotateup = rotateup;
    if(back){
      gift.sendToBack();
    }
  },
  closeClaw : function(isClose) {
    if (isClose) {
      this.claw.loadTexture('claw_closed');
      var total = this.gifts.children.length;
      var seed = this.winprize

      for ( var i in this.gifts.children) {
        var gift = this.gifts.children[i];
        if(gift.key == ("sprites" + seed)){
          gift.destroy();
        }
      }


      this.hitGift = this.game.add.sprite(580 - this.dollOffsetX, 690,
        'sprites' + seed);
      this.game.world.bringToTop(this.gifts);
    } else {
      this.claw.loadTexture('claw');
    }

  },
  preload: function() {
    this.background = this.add.sprite(0, 0, 'preloaderBackground');
    this.preloadBar = this.add.sprite(340, 345, 'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);
    var phaserJSON = this.game.cache.getJSON('imglists');
    console.log(phaserJSON)
    if(phaserJSON.retval === 'ok'){
        for(var i=0; i < phaserJSON.retinfo.length; i++){
            console.log(phaserJSON.retinfo[i].giftimg);
            console.log(i);
            this.load.image('sprites' + i, phaserJSON.retinfo[i].giftimg);
            this.giftsobject[phaserJSON.retinfo[i].giftid] = i;
        }
    }
    this.max_doll = phaserJSON.retinfo.length
  },
  checkTime: function(){
    if(this.countdown > 0){
      this.countdown-=1;
      this.time_text.setText(this.countdown);
    }
  },
  create : function() {
    this.background = this.add.sprite(0, 0, 'preloaderBackground');



    this.gifts = this.game.add.group();

    this.game.add.sprite(460, 950,
        'text2');
    this.claw = this.gifts.create(this.zero_point[0], this.zero_point[1], 'claw');

    this.closeClaw(false);
    this.claw_rope = this.game.add.sprite(this.zero_point[0] + 100, this.zero_point[1], 'claw_rope');
    // attach pointer events

    startSignal.add(this.release, this);

    //this.game.input.onDown.add(this.click, this);
    //this.game.input.onUp.add(this.release, this);
    for(var i = 0; i< this.max_doll; i++){
      var x,y,rotateup;
      if(i < this.max_doll/2){

        rotateup = false;

        x = 600 - this.ovalWidth + (this.ovalWidth*2/Math.floor(this.max_doll/2))*i;
        y = 700 - Math.sqrt((this.ovalWidth*this.ovalWidth*this.ovalHeight*this.ovalHeight - this.ovalHeight*this.ovalHeight*(x -600)*(x -600))/(this.ovalWidth*this.ovalWidth));
        this.spawnDoll(i, x, y, rotateup, false);
      }else{
        rotateup = true;
        x = 600 + this.ovalWidth - (this.ovalWidth*2/Math.floor(this.max_doll/2 + 1)) * (i - Math.floor(this.max_doll/2))
        y = 700 + Math.sqrt((this.ovalWidth*this.ovalWidth*this.ovalHeight*this.ovalHeight - this.ovalHeight*this.ovalHeight*(x -600)*(x -600))/(this.ovalWidth*this.ovalWidth));
        this.spawnDoll(i, x, y, rotateup, true);
      }
    }
    this.add.sprite(4, 0, 'topmask');
    this.add.sprite(70, 10, 'topframe');
    this.add.sprite(840, 10, 'topframe');
    this.add.sprite(98, 25, 'topleft');

    this.add.sprite(303, 10, 'countdown');
    this.time_text = this.game.add.text(540, 60, this.countdown, {
      font: "65px Arial",
      fill: "#ffffff",
      align: "center"
    });
    this.time_text.anchor.setTo(0.5, 0.5);
    this.timer = this.game.time.create(false);
    this.timer.loop(1000, this.checkTime, this);
    this.timer.start();
  },
  update : function() {
    if(this.countdown <=0){
      this.state.start('FailMenu', true, false);
    }
    for ( var i in this.gifts.children) {
      var gift = this.gifts.children[i];

      if(gift.key.match(/sprites/)){
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
    if(this.winprize){
      this.state.start('MainMenu', true, false, this.winprize);
    }else{
      this.state.start('FailMenu', true, false);
    }

  }
};

