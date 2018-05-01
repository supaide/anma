let resource = {
  ratio: 1,
  load: function (resList, options, callback) {
    options = options || {}
    resource.ratio = options.ratio ? options.ratio : 1
    PIXI.loader.add([].concat(resList)).load(function () {
      callback && callback()
    })
  }
}

export default resource
