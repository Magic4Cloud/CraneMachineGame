BasicGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false

};

BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {

    init: function () {

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;

        this.scale.setMinMax(1080, 990, 1080, 990);
        this.scale.refresh();
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //this.scale.refresh();
       //
       if (!this.game.device.desktop)
       {
           // this.scale.forceOrientation(false, true);
           this.scale.setResizeCallback(this.gameResized, this);
           this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
           this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
       }

    },

    preload: function () {
        this.load.crossOrigin = "file:///android_asset/game/index.html";
        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloaderBackground', './images/bg.png');

        this.load.image('preloaderBar', './images/preloader_bar.png');

    },

    create: function () {

        this.state.start('Preloader');

    },

    gameResized: function (width, height) {
        this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;

        this.scale.setMinMax(1080, 990, 1080, 990);
        this.scale.refresh();
        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.

    },

    enterIncorrectOrientation: function () {

        BasicGame.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        BasicGame.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }

};


BasicGame.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;

  this.ready = false;

};

BasicGame.Preloader.prototype = {
  preload: function () {

    //  These are the assets we loaded in Boot.js
    //  A nice sparkly background and a loading progress bar
    this.background = this.add.sprite(0, 0, 'preloaderBackground');
    this.preloadBar = this.add.sprite(340, 345, 'preloaderBar');

    //  This sets the preloadBar sprite as a loader sprite.
    //  What that does is automatically crop the sprite from 0 to full-width
    //  as the files below are loaded in.

    var userid = this.game.net.getQueryString('userId');
    var code = this.game.net.getQueryString('code');
    this.load.setPreloadSprite(this.preloadBar);

    //  Here we load the rest of the assets our game needs.
    //  As this is just a Project Template I've not provided these assets, the lines below won't work as the files themselves will 404, they are just an example of use.
    //  this.load.image('titlepage', 'images/title.png');
    //this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
    //this.load.audio('titleMusic', ['audio/main_menu.mp3']);
    //this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');
    //  + lots of other required assets here
    this.load.crossOrigin = "file:///android_asset/game/index.html";
    this.load.json('imglists', 'http://wx.guangguang.net.cn/treasure/index.php/qjxk/gift/getlist?openid=' + userid + '&code=' + code);

    this.load.image('claw', './assets/sprites/claw_open.png');
    this.load.image('claw_closed', './assets/sprites/claw_closed.png');
    this.load.image('claw_rope', './assets/sprites/claw_rope.png');
        // for(var i = 1;i < 11;i++){
    //  this.load.image('sprite_' + i,'assets/sprites/' + i + '.png');
         //    this.load.image('sprite_' + i + "1",'assets/sprites/' + i + '1.png');
    // }

    //this.load.image('btn_play_up','assets/button/btn_play_up.png');
    //this.load.image('sprites1', 'http://seopic.699pic.com/photo/50001/1802.jpg_wh1200.jpg');
    this.load.image('countdown', './images/count-down.png');
    this.load.image('topframe', './images/top-frame.png');
    this.load.image('topmask', './images/top-mask.png');
    this.load.image('topleft', './images/topleft.png');
    this.load.image('topright', './images/topright.png');
    this.load.image('mask', './images/mask.png');
    this.load.image('fail', './images/fail.png');
    this.load.image('regret', './images/regret.png');


    this.load.image('returnbtn', './assets/sprites/returnbtn.png');
    this.load.image('gotchapg', './assets/sprites/gotchapg.png');
    this.load.image('success', './assets/sprites/success.png');
    this.load.image('text1', './assets/sprites/text1.png');
    this.load.image('text2', './assets/sprites/text2.png');


    //game.load.json('imglists', 'http://run.plnkr.co/plunks/v8xyYN64V4nqCshgjKms/data-1.json');


  },

  create: function () {
    //  Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
    this.preloadBar.cropEnabled = false;
  },

  update: function () {

    //  You don't actually need to do this, but I find it gives a much smoother game experience.
    //  Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
    //  You can jump right into the menu if you want and still play the music, but you'll have a few
    //  seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
    //  it's best to wait for it to decode here first, then carry on.

    //  If you don't have any music in your game then put the game.state.start line into the create function and delete
    //  the update function completely.

    if (this.ready == false)
    {
      this.ready = true;
      this.state.start('Game');
    }

  }

};

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
  winprize: null,
  dollOffsetY: 75,
  ovalWidth: 320,
  ovalHeight: 40,
  giftready: false,
  claw_state : 0,
  claw_speed : 5,
  shake: 0,
  rotate_speed: 5,
  claw_rope:null,
  claw_pip:null,
  claw_box:null,
  rotateup: true,
  zero_point : [420,120],
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
    var ret;
    var self = this;

    try{
      ret = JSON.parse(result);
    }catch(e){
      self.quitGame();
      return;
    }
    if(!ret || ret.retval == 'fail'){
      this.quitGame();
      return;
    }

    this.winprize = this.giftsobject[ret.retinfo.giftid];
    this.claw_state = 2;
  },
  stopcountdown: function(){
    this.timer.stop();
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
          this.gifts.removeChildAt(i)
        }
      }
      this.hitGift = this.game.add.sprite(this.claw.x + 45, 700, 'sprites' + seed);
      //this.game.world.bringToTop(this.gifts);
    } else {
      this.claw.loadTexture('claw');
    }
  },
  preload: function() {
    this.background = this.add.sprite(0, 0, 'preloaderBackground');
    this.preloadBar = this.add.sprite(340, 345, 'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);
    var phaserJSON;
    try{
      phaserJSON = this.game.cache.getJSON('imglists');
    }catch(e){
    }
    if(phaserJSON && phaserJSON.retval === 'ok'){
        for(var i=0; i < phaserJSON.retinfo.length; i++){
            this.load.image('sprites' + i, phaserJSON.retinfo[i].giftimg);
            this.giftsobject[phaserJSON.retinfo[i].giftid] = i;
        }
        this.max_doll = phaserJSON.retinfo.length
    }else{
      this.max_doll = 0;
    }

  },
  checkTime: function(){
    this.countdown-=1;
    if(this.countdown >= 0){
      this.time_text.setText(this.countdown);
    }
  },
  create : function() {
    this.background = this.add.sprite(0, 0, 'preloaderBackground');

    this.gifts = this.game.add.group();

    this.game.add.sprite(460, 950, 'text2');
    this.claw = this.gifts.create(this.zero_point[0], this.zero_point[1], 'claw');

    this.closeClaw(false);
    this.claw_rope = this.game.add.sprite(this.zero_point[0] + 100, this.zero_point[1], 'claw_rope');
    // attach pointer events

    startSignal.add(this.release, this);
    countdownSignal.add(this.stopcountdown, this);

    //this.game.input.onDown.add(this.click, this);
    //this.game.input.onUp.add(this.release, this);
    for(var i = 0; i< this.max_doll; i++){
      var x,y,rotateup;
      if(i < this.max_doll/2){
        rotateup = false;
        x = 600 - this.ovalWidth + (this.ovalWidth*2/Math.floor(this.max_doll/2))*i;
        y = 700 - (this.ovalWidth - Math.abs(x + this.dollOffsetX -600))*this.ovalHeight/this.ovalWidth;
        //y = 700 - Math.sqrt((this.ovalWidth*this.ovalWidth*this.ovalHeight*this.ovalHeight - this.ovalHeight*this.ovalHeight*(x -600)*(x -600))/(this.ovalWidth*this.ovalWidth));
        this.spawnDoll(i, x, y, rotateup, false);
      }else{
        rotateup = true;
        x = 600 + this.ovalWidth - (this.ovalWidth*2/Math.floor(this.max_doll/2 + 1)) * (i - Math.floor(this.max_doll/2))
        y = 700 + (this.ovalWidth - Math.abs(x + this.dollOffsetX -600))*this.ovalHeight/this.ovalWidth;
        //y = 700 + Math.sqrt((this.ovalWidth*this.ovalWidth*this.ovalHeight*this.ovalHeight - this.ovalHeight*this.ovalHeight*(x -600)*(x -600))/(this.ovalWidth*this.ovalWidth));
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
    var self = this;
    console.log('ready')
    try{
      self.giftready = true;
      onReady();
    }catch(e){
    }
  },
  update : function() {
    this.shake = Math.round(Math.random()*20) - 10;
    if(this.countdown <=-2){
      this.state.start('FailMenu', true, false);
    }
    if(this.giftready){
      if (this.claw_state == 2) {
        this.rotate_speed = 20;
        this.claw.y += this.claw_speed;
        this.claw.x += this.shake;
        this.claw_rope.height += this.claw_speed;
        this.claw_rope.x += this.shake;
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
        this.rotate_speed = 5;
        this.claw_state = 0;
        this.closeClaw(false);
        this.quitGame();
      }
      for ( var i in this.gifts.children) {
        var gift = this.gifts.children[i];
        if(gift.key.match(/sprites/)){
          if(gift.x >= (600 + this.ovalWidth - this.dollOffsetX)){
            gift.rotateup = true;
          }else if(gift.x <= (600 - this.ovalWidth - this.dollOffsetX)){
            gift.rotateup = false;
          }
          if(!gift.rotateup){
            //gift.bringToTop();
            gift.y = 700 - this.dollOffsetY + Math.abs((this.ovalWidth - Math.abs(gift.x + this.dollOffsetX -600)))*this.ovalHeight/this.ovalWidth;
            gift.x += this.rotate_speed;

            //gift.y = 700 + Math.sqrt((this.ovalWidth*this.ovalWidth*this.ovalHeight*this.ovalHeight - this.ovalHeight*this.ovalHeight*(gift.x + this.dollOffsetX -600)*(gift.x + this.dollOffsetX -600))/(this.ovalWidth*this.ovalWidth)) - this.dollOffsetY;


          }else if(gift.rotateup){
            //gift.sendToBack();
            gift.y = 700 - this.dollOffsetY - Math.abs((this.ovalWidth - Math.abs(gift.x + this.dollOffsetX -600)))*this.ovalHeight/this.ovalWidth;
            gift.x -= this.rotate_speed;

            //gift.y = 700 - Math.sqrt((this.ovalWidth*this.ovalWidth*this.ovalHeight*this.ovalHeight - this.ovalHeight*this.ovalHeight*(gift.x + this.dollOffsetX -600)*(gift.x + this.dollOffsetX -600))/(this.ovalWidth*this.ovalWidth)) - this.dollOffsetY;
          }
        }
      }
    }
  },
  quitGame : function(pointer) {

    // Here you should destroy anything you no longer need.
    // Stop music, delete sprites, purge caches, free resources, all that
    // good stuff.
    // Then let's go back to the main menu.
    console.log(this.winprize)
    //startSignal.removeAll();
    if(this.winprize || this.winprize == 0){
      console.log('win')
      this.state.start('MainMenu', true, false, this.winprize);
    }else{
      console.log('fail')
      this.state.start('FailMenu', true, false);
    }

  }
};



BasicGame.FailMenu = function (game) {

  this.music = null;
  this.playButton = null;

};

BasicGame.FailMenu.prototype = {
  timer: null,
  countdown: 15,
  checkTime: function(){
    if(this.countdown > 0){
      console.log(this.countdown);
      this.countdown-=1;
    }
  },
  create: function () {

    //  We've already preloaded our assets, so let's kick right into the Main Menu itself.
    //  Here all we're doing is playing some music and adding a picture and button
    //  Naturally I expect you to do something significantly better :)

    //this.music = this.add.audio('bgm');
    //this.music.play();
    this.background = this.add.sprite(0, 0, 'preloaderBackground');
    this.add.sprite(4, 0, 'topmask');
    this.add.sprite(70, 10, 'topframe');
    this.add.sprite(840, 10, 'topframe');
    this.add.sprite(98, 25, 'topleft');
    this.add.sprite(860, 52, 'topright');
    this.add.sprite(303, 10, 'countdown');
    this.add.sprite(0, 0, 'mask');


    this.add.sprite(220, 120, 'fail');
    this.add.sprite(404, 200, 'regret')
    this.playButton = this.add.button(320, 720, 'returnbtn', this.startGame, this);
    this.game.add.sprite(460, 950, 'text2');
    if(openError){
      try{
        openError();
      }catch(e){

      }
    }
    this.timer = this.game.time.create(false);
    this.timer.loop(1000, this.checkTime, this);
    this.timer.start();
  },
  update: function () {
    if(this.countdown ==0 ){
      this.startGame();
    }
    //  Do some nice funky main menu effect here

  },
  startGame: function (pointer) {

    //  Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
    //this.music.stop();

    //  And start the actual game
    if(openFaceDecect){
      try{
        openFaceDecect()
      }catch(e){
      }
    }
  }
};


BasicGame.MainMenu = function (game) {

  this.music = null;
  this.playButton = null;

};

BasicGame.MainMenu.prototype = {
  giftIndex: null,
  timer: null,
  countdown: 15,
  init: function(giftIndex){
    this.giftIndex = giftIndex;
  },
  checkTime: function(){
    if(this.countdown > 0){
      this.countdown-=1;
    }
  },
  create: function () {
    this.background = this.add.sprite(0, 0, 'preloaderBackground');

    this.pg = this.add.sprite(0, 0, 'gotchapg');
    this.title = this.add.sprite(360, 160, 'success');
    this.game.add.sprite(570 - 75, 330,
        'sprites' + this.giftIndex);
    this.game.add.sprite(420, 660,
        'text1');
    this.playButton = this.add.button(320, 720, 'returnbtn', this.startGame, this);
    this.game.add.sprite(460, 950,
        'text2');
    this.timer = this.game.time.create(false);
    this.timer.loop(1000, this.checkTime, this);
    this.timer.start();
  },

  update: function () {
    if(this.countdown == 0){
      this.startGame();
    }
    //  Do some nice funky main menu effect here

  },

  startGame: function (pointer) {

    //  Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
    //this.music.stop();

    //  And start the actual game
    if(openFaceDecect){
      try{
        openFaceDecect()
      }catch(e){
      }
    }


  }

};
