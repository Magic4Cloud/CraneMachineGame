
BasicGame.MainMenu = function (game) {

  this.music = null;
  this.playButton = null;

};

BasicGame.MainMenu.prototype = {
  giftIndex: null,
  init: function(giftIndex){
    this.giftIndex = giftIndex;
  },

  create: function () {

    //  We've already preloaded our assets, so let's kick right into the Main Menu itself.
    //  Here all we're doing is playing some music and adding a picture and button
    //  Naturally I expect you to do something significantly better :)

    //this.music = this.add.audio('bgm');
    //this.music.play();
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
    console.log(this.hitGift)
  },

  update: function () {

    //  Do some nice funky main menu effect here

  },

  startGame: function (pointer) {

    //  Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
    //this.music.stop();

    //  And start the actual game
    if(openFaceDecect){
      openFaceDecect()
    }


  }

};
