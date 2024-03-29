
BasicGame.FailMenu = function (game) {

  this.music = null;
  this.playButton = null;

};

BasicGame.FailMenu.prototype = {
  timer: null,
  countdown: 15,
  errorcode: 0,
  init: function(errorcode){
    this.errorcode = errorcode;
  },
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

    if(this.errorcode == -1){
      this.add.sprite(220, 120, 'fail2');
    }else{
      this.add.sprite(220, 120, 'fail');
    }

    this.add.sprite(404, 200, 'regret')
    this.playButton = this.add.button(320, 720, 'returnbtn', this.startGame, this);
    this.game.add.sprite(460, 940, 'text2');
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
