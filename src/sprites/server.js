import Resource from './resource'

let levels = ['blue', 'yellow', 'red'] // normal / warning / fatal

let server = function (app, name, x, y, options) {
  options = options || {}
  this.speed = options.speed ? options.speed : 0.5
  this.name = name
  this.nodes = {}
  let x0 = x / Resource.ratio
  let y0 = y / Resource.ratio
  let sx = 1 / Resource.ratio
  let sy = sx
  for (let i=0; i<levels.length; i++) {
    let frames = [];
    for (let j = 0; j < 3; j++) {
      frames.push(PIXI.Texture.fromFrame(name+'_'+levels[i]+'_0000'+j+'.png'));
    }
    let anim = new PIXI.extras.AnimatedSprite(frames)
    anim.animationSpeed = this.speed
    anim.anchor.set(0.5, 1)
    anim.renderable = false
    anim.x = x0
    anim.y = y0
    anim.scale.x = sx
    anim.scale.y = sy
    app.stage.addChild(anim)
    this.nodes[levels[i]] = anim
  }
  if (this.nodes.blue) {
    this.nodes.blue.renderable = true
    this.nodes.blue.gotoAndStop(0)
  }
}

let play = function (level, index) {
  Object.keys(this.nodes).forEach((k) => {
    this.nodes[k].stop()
    this.nodes[k].renderable = false
  })

  if (this.nodes[level]) {
    this.nodes[level].renderable = true
    if (typeof index !== 'undefined' && index >= 0 && index < 3) {
      this.nodes[level].gotoAndStop(index)
    } else {
      this.nodes[level].play()
    }
  }
}

server.prototype.normal = function (index) {
  play.call(this, 'blue', index)
}

server.prototype.warning = function (index) {
  play.call(this, 'yellow', index)
}

server.prototype.fatal = function (index) {
  play.call(this, 'red', index)
}

server.prototype.destory = function () {
  // TODO do destory
}

export default server
