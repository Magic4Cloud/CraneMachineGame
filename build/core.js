BasicGame={score:0,music:null,orientated:!1},BasicGame.Boot=function(t){},BasicGame.Boot.prototype={init:function(){this.input.maxPointers=1,this.stage.disableVisibilityChange=!0,this.scale.scaleMode=Phaser.ScaleManager.NO_SCALE,this.scale.setMinMax(1080,990,1080,990),this.scale.refresh(),this.scale.pageAlignHorizontally=!0,this.scale.pageAlignVertically=!0,this.game.device.desktop||(this.scale.setResizeCallback(this.gameResized,this),this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation,this),this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation,this))},preload:function(){this.load.image("preloaderBackground","images/bg.png"),this.load.image("preloaderBar","images/preloader_bar.png")},create:function(){this.state.start("Preloader")},gameResized:function(t,i){this.scale.scaleMode=Phaser.ScaleManager.NO_SCALE,this.scale.setMinMax(1080,990,1080,990),this.scale.refresh()},enterIncorrectOrientation:function(){BasicGame.orientated=!1,document.getElementById("orientation").style.display="block"},leaveIncorrectOrientation:function(){BasicGame.orientated=!0,document.getElementById("orientation").style.display="none"}},BasicGame.Preloader=function(t){this.background=null,this.preloadBar=null,this.ready=!1},BasicGame.Preloader.prototype={preload:function(){this.background=this.add.sprite(0,0,"preloaderBackground"),this.preloadBar=this.add.sprite(340,345,"preloaderBar");var t=this.game.net.getQueryString("userid"),i=this.game.net.getQueryString("code");this.load.setPreloadSprite(this.preloadBar),this.load.crossOrigin="Anonymous",this.load.json("imglists","http://test97.guangguang.net.cn/~yinhd/treasure/index.php/qjxk/gift/getlist?userid="+t+"&code="+i),this.load.image("claw","assets/sprites/claw_open.png"),this.load.image("claw_closed","assets/sprites/claw_closed.png"),this.load.image("claw_rope","assets/sprites/claw_rope.png"),this.load.image("countdown","images/count-down.png"),this.load.image("topframe","images/top-frame.png"),this.load.image("topmask","images/top-mask.png"),this.load.image("topleft","images/topleft.png"),this.load.image("topright","images/topright.png"),this.load.image("mask","images/mask.png"),this.load.image("fail","images/fail.png"),this.load.image("regret","images/regret.png"),this.load.image("returnbtn","assets/sprites/returnbtn.png"),this.load.image("gotchapg","assets/sprites/gotchapg.png"),this.load.image("success","assets/sprites/success.png"),this.load.image("text1","assets/sprites/text1.png"),this.load.image("text2","assets/sprites/text2.png")},create:function(){this.preloadBar.cropEnabled=!1},update:function(){0==this.ready&&(this.ready=!0,this.state.start("Game"))}},BasicGame.Game=function(t){this.game,this.add,this.camera,this.cache,this.input,this.load,this.math,this.sound,this.stage,this.time,this.tweens,this.world,this.particles,this.physics,this.rnd,this.release},BasicGame.Game.prototype={dropRate:.2,hitGiftIndex:null,hitGift:null,catchAssist:!1,claw:null,giftsobject:{},claw_length:520,dollOffsetX:75,winprize:null,dollOffsetY:75,ovalWidth:320,ovalHeight:40,claw_state:0,claw_speed:5,rotate_speed:2,claw_rope:null,claw_pip:null,claw_box:null,rotateup:!0,zero_point:[420,0],gifts:null,layer:null,sfx_win:null,sfx_lose:null,sfx_claw:[],score_text:null,time_text:null,max_doll:9,score:0,countdown:30,coin:0,timer:null,tileObjects:null,click:function(){0===this.claw_state&&(this.claw_state=1)},release:function(t,i,e){this.timer.stop(),this.add.sprite(860,52,"topright"),console.log(e);var s;try{s=JSON.parse(e)}catch(t){alert("服务器故障")}console.log(s.retinfo.giftid),this.winprize=this.giftsobject[s.retinfo.giftid],console.log(this.winprize),this.claw_state=2},stopcountdown:function(){this.timer.stop()},spawnDoll:function(t,i,e,s,a){Math.round(Math.random()+1);var o=this.gifts.create(i-this.dollOffsetX,e-this.dollOffsetY,"sprites"+t);o.rotateup=s,a&&o.sendToBack()},closeClaw:function(t){if(t){this.claw.loadTexture("claw_closed");this.gifts.children.length;var i=this.winprize;for(var e in this.gifts.children)this.gifts.children[e].key=="sprites"+i&&this.gifts.removeChildAt(e);this.hitGift=this.game.add.sprite(545-this.dollOffsetX,700,"sprites"+i),this.game.world.bringToTop(this.gifts)}else this.claw.loadTexture("claw")},preload:function(){this.background=this.add.sprite(0,0,"preloaderBackground"),this.preloadBar=this.add.sprite(340,345,"preloaderBar"),this.load.setPreloadSprite(this.preloadBar);var t=this.game.cache.getJSON("imglists");if("ok"===t.retval)for(var i=0;i<t.retinfo.length;i++)console.log(t.retinfo[i].giftimg),console.log(i),this.load.image("sprites"+i,t.retinfo[i].giftimg),this.giftsobject[t.retinfo[i].giftid]=i;else alert("服务器故障");this.max_doll=t.retinfo.length},checkTime:function(){this.countdown>0&&(this.countdown-=1,this.time_text.setText(this.countdown))},create:function(){this.background=this.add.sprite(0,0,"preloaderBackground"),this.gifts=this.game.add.group(),this.game.add.sprite(460,950,"text2"),this.claw=this.gifts.create(this.zero_point[0],this.zero_point[1],"claw"),this.closeClaw(!1),this.claw_rope=this.game.add.sprite(this.zero_point[0]+100,this.zero_point[1],"claw_rope"),startSignal.add(this.release,this),countdownSignal.add(this.stopcountdown,this);for(var t=0;t<this.max_doll;t++){var i,e,s;t<this.max_doll/2?(s=!1,i=600-this.ovalWidth+2*this.ovalWidth/Math.floor(this.max_doll/2)*t,e=700-Math.sqrt((this.ovalWidth*this.ovalWidth*this.ovalHeight*this.ovalHeight-this.ovalHeight*this.ovalHeight*(i-600)*(i-600))/(this.ovalWidth*this.ovalWidth)),this.spawnDoll(t,i,e,s,!1)):(s=!0,i=600+this.ovalWidth-2*this.ovalWidth/Math.floor(this.max_doll/2+1)*(t-Math.floor(this.max_doll/2)),e=700+Math.sqrt((this.ovalWidth*this.ovalWidth*this.ovalHeight*this.ovalHeight-this.ovalHeight*this.ovalHeight*(i-600)*(i-600))/(this.ovalWidth*this.ovalWidth)),this.spawnDoll(t,i,e,s,!0))}this.add.sprite(4,0,"topmask"),this.add.sprite(70,10,"topframe"),this.add.sprite(840,10,"topframe"),this.add.sprite(98,25,"topleft"),this.add.sprite(303,10,"countdown"),this.time_text=this.game.add.text(540,60,this.countdown,{font:"65px Arial",fill:"#ffffff",align:"center"}),this.time_text.anchor.setTo(.5,.5),this.timer=this.game.time.create(!1),this.timer.loop(1e3,this.checkTime,this),this.timer.start();try{onReady()}catch(t){}},update:function(){this.countdown<=0&&this.state.start("FailMenu",!0,!1);for(var t in this.gifts.children){var i=this.gifts.children[t];i.key.match(/sprites/)&&(i.x>=600+this.ovalWidth-this.dollOffsetX?(i.rotateup=!0,i.sendToBack()):i.x<=600-this.ovalWidth-this.dollOffsetX&&(i.bringToTop(),i.rotateup=!1),i.rotateup?i.rotateup&&(i.x-=this.rotate_speed,i.y=700-Math.sqrt((this.ovalWidth*this.ovalWidth*this.ovalHeight*this.ovalHeight-this.ovalHeight*this.ovalHeight*(i.x+this.dollOffsetX-600)*(i.x+this.dollOffsetX-600))/(this.ovalWidth*this.ovalWidth))-this.dollOffsetY):(i.x+=this.rotate_speed,i.y=700+Math.sqrt((this.ovalWidth*this.ovalWidth*this.ovalHeight*this.ovalHeight-this.ovalHeight*this.ovalHeight*(i.x+this.dollOffsetX-600)*(i.x+this.dollOffsetX-600))/(this.ovalWidth*this.ovalWidth))-this.dollOffsetY))}if(2==this.claw_state?(this.rotate_speed=10,this.claw.y+=this.claw_speed,this.claw_rope.height+=this.claw_speed,this.claw.y>=this.claw_length&&(this.closeClaw(!0),this.claw_state=3)):3==this.claw_state?(this.claw.y-=this.claw_speed,this.claw_rope.height-=this.claw_speed,this.hitGift&&(this.hitGift.y-=this.claw_speed),this.claw.y<=this.zero_point[1]&&(this.claw.y=this.zero_point[1],this.claw_state=4)):4==this.claw_state&&(this.rotate_speed=2,this.claw_state=0,this.closeClaw(!1),this.quitGame()),this.hitGift)Math.random();else if((3==this.claw_state||4==this.claw_state)&&this.game.time.now%30==0){Math.random();this.dropRate}},quitGame:function(t){console.log(this.winprize),this.winprize||0==this.winprize?this.state.start("MainMenu",!0,!1,this.winprize):this.state.start("FailMenu",!0,!1)}},BasicGame.FailMenu=function(t){this.music=null,this.playButton=null},BasicGame.FailMenu.prototype={create:function(){if(this.background=this.add.sprite(0,0,"preloaderBackground"),this.add.sprite(4,0,"topmask"),this.add.sprite(70,10,"topframe"),this.add.sprite(840,10,"topframe"),this.add.sprite(98,25,"topleft"),this.add.sprite(860,52,"topright"),this.add.sprite(303,10,"countdown"),this.add.sprite(0,0,"mask"),this.add.sprite(220,120,"fail"),this.add.sprite(404,200,"regret"),this.playButton=this.add.button(320,720,"returnbtn",this.startGame,this),this.game.add.sprite(460,950,"text2"),openError)try{openError()}catch(t){}},update:function(){},startGame:function(t){if(openFaceDecect)try{openFaceDecect()}catch(t){}}},BasicGame.MainMenu=function(t){this.music=null,this.playButton=null},BasicGame.MainMenu.prototype={giftIndex:null,init:function(t){this.giftIndex=t},create:function(){this.background=this.add.sprite(0,0,"preloaderBackground"),this.pg=this.add.sprite(0,0,"gotchapg"),this.title=this.add.sprite(360,160,"success"),this.game.add.sprite(495,330,"sprites"+this.giftIndex),this.game.add.sprite(420,660,"text1"),this.playButton=this.add.button(320,720,"returnbtn",this.startGame,this),this.game.add.sprite(460,950,"text2")},update:function(){},startGame:function(t){if(openFaceDecect)try{openFaceDecect()}catch(t){}}};