
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
    if(this.countdown <=0){
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
        console.log(e)
      }
    }


  }

};
