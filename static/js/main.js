var app = new PIXI.Application({
  width: appConfig.width,
  height: appConfig.height,
  antialias: true,    // default: false
  transparent: true, // default: false
  resolution: 1       // default: 1
});
app.stop();
setTimeout(()=>{
  document.querySelector('#main').append(app.view);
  PIXI.loader
    .add('res/img/fanghuoqiang.json')
    .load(function () {
      var frames = [];
      for (var i = 0; i < 3; i++) {
        frames.push(PIXI.Texture.fromFrame('fanghuoqiang1_blue_0000'+i+'.png'));
      }
      var anim = new PIXI.extras.AnimatedSprite(frames);
      anim.animationSpeed = 0.5;
      //anim.anchor.set(0.5, 1);
      //anim.renderable = false;
      anim.play();
      app.stage.addChild(anim);
      window.abc = anim;

      var ropeLength = 45;
      var points = [];
      for (var i = 0; i < 5; i++) {
        points.push(new PIXI.Point(i * ropeLength, 0));
      }
      var strip = new PIXI.mesh.Rope(PIXI.Texture.fromImage('res/img/pic.png'), points);
      strip.x = 40;
      strip.y = 200;
      app.stage.addChild(strip);
      var g = new PIXI.Graphics();
      g.x = strip.x;
      g.y = strip.y;
      app.stage.addChild(g);

      var count = 0;

      app.ticker.add(()=>{
        count += 0.1;
        for (var i = 0; i < points.length; i++) {
          points[i].y = Math.sin((i * 0.5) + count) * 30;
          points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 20;
        }
        renderPoints();
      })
      function renderPoints () {

        g.clear();

        g.lineStyle(2,0xffc2c2);
        g.moveTo(points[0].x,points[0].y);

        for (var i = 1; i < points.length; i++) {
          g.lineTo(points[i].x,points[i].y);
        }

        for (var i = 1; i < points.length; i++) {
          g.beginFill(0xff0022);
          g.drawCircle(points[i].x,points[i].y,10);
          g.endFill();
        }
      }


      app.start();
    });
},0)
