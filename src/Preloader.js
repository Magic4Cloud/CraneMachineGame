
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
    this.load.json('imglists', 'http://wx.guangguang.net.cn/treasure_game/index.php/qjxk/gift/getlist?openid=' + userid + '&code=' + code);

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
