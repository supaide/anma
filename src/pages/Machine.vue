<template>
  <div class="machine" :style="{width: width+'px', height: height+'px'}">
    <div ref="container"></div>
    <info-pannel title="登录人数" :top="50" :left="50" :height="150" :width="200">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </info-pannel>
    <info-pannel title="威胁性操作" :top="260" :left="50" :height="150" :width="200">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </info-pannel>
    <info-pannel title="服务器运行状态" :top="50" :right="50" :height="350" :width="200">
      <ul class="machine-running">
        <li data-level="normal" @click="setLevel">恢复健康</li>
        <li data-level="warning" @click="setLevel">全部报警</li>
        <li data-level="fatal" @click="setLevel">全部严重</li>
      </ul>
    </info-pannel>
  </div>
</template>

<script>
import {http, event} from 'h5-webutil'
import InfoPannel from '../components/InfoPannel'
import Server from '../sprites/server'
import Resource from '../sprites/resource'
export default {
  components: {
    InfoPannel
  },
  data () {
    return {
      width: this.$store.state.config.width,
      height: this.$store.state.config.height
    }
  },
  created () {
    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      antialias: true,
      transparent: true,
      resolution: 1
    });
  },
  destoryed () {
    if (this.nodes) {
      for (let i=0; i<this.nodes.length; i++) {
        this.nodes[i].destory()
      }
    }
  },
  mounted () {
    this.$refs.container.append(this.app.view)
    let me = this
    let resources = [
      '/static/img/fanghuoqiang.json',
      '/static/img/fuwuqi.json',
      '/static/img/net.json'
    ]
    this.nodes = []
    Resource.load(resources, {ratio: this.$store.state.config.ratio}, function () {
      let fwq21 = new Server(me.app, 'fuwuqi4', 864, 326)
      let fwq22 = new Server(me.app, 'fuwuqi4', 1075, 423)
      let fwq23 = new Server(me.app, 'fuwuqi4', 1363, 547)

      let fhq21 = new Server(me.app, 'fanghuoqiang5', 730, 346)
      let fhq22 = new Server(me.app, 'fanghuoqiang5', 998, 480)

      let jhj = new Server(me.app, 'jiaohuanji', 807, 461)
      let lyq = new Server(me.app, 'luyouqi', 1095, 634)
      let fhq0 = new Server(me.app, 'fanghuoqiang1', 1267, 710)
      let yun = new Server(me.app, 'yun', 1420, 806)

      let fhq11 = new Server(me.app, 'fanghuoqiang5', 576, 403)
      let fhq12 = new Server(me.app, 'fanghuoqiang5', 826, 548)

      let fwq11 = new Server(me.app, 'fuwuqi2', 440, 500)
      let fwq12 = new Server(me.app, 'fuwuqi2', 700, 650)
      let fwq13 = new Server(me.app, 'fuwuqi2', 980, 807)

      me.nodes.push(fwq21, fwq22, fwq23, fwq11, fwq12, fwq13, fhq11, fhq12, fhq21, fhq22, jhj, lyq, fhq0, yun)
      yun.normal()
      lyq.warning()
      jhj.fatal()
      fwq21.fatal()
      fwq23.fatal()
    })
  },
  methods: {
    setLevel (e) {
      let level = e.target.dataset.level
      for (let i=0; i<this.nodes.length; i++) {
        if (level == 'normal') {
          this.nodes[i].normal(0)
        } else if (level == 'warning') {
          this.nodes[i].warning()
        } else if (level == 'fatal') {
          this.nodes[i].fatal()
        }
      }
    }
  }
}
</script>

<style lang="less">
.machine {
  position: relative;
  .machine-running li {
    cursor: pointer;
    padding: 5px 0;
    background: rgba(255, 255, 255, 0.1);
    margin: 2px 0;
  }
}
</style>
