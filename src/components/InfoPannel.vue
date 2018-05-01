<template>
<div class="info-pannel" :style="{
  left: left > 0 ? left + 'px' : null,
  right: right > 0 ? right + 'px' : null,
  width: width0 > 0 ? width0 + 'px' : null,
  top: top + 'px'
  }">
  <div class="info-pannel-head">
    <div>{{title}}</div>
    <a @click="collapse" :class="opened ? null : 'info-pannel-closed'"><</a>
  </div>
  <div class="info-pannel-line"></div>
  <div class="info-pannel-body" :style="{height: opened ? height+'px' : '0px'}">
    <slot></slot>
  </div>
</div>
</template>
<script>
export default {
  props: {
    top: Number,
    left: Number,
    width: Number,
    height: Number,
    right: Number,
    title: String
  },
  data () {
    return {
      width0: this.width,
      opened: true
    }
  },
  methods: {
    collapse () {
      this.opened = !this.opened
    }
  },
  watch: {
    width (val) {
      this.width0 = val
    }
  }
}
</script>
<style lang="less">
.info-pannel {
  position: absolute;
  z-index: 100;
  background: rgba(0, 0, 0, 0.31);
  color: #fff;
  padding: 5px 0;
  .info-pannel-head {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      cursor: pointer;
      width: 25px;
      text-align: right;
      transition: all .5s;
      transform: rotate(-90deg);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    a.info-pannel-closed {
      transform: rotate(90deg);
    }
  }
  .info-pannel-line {
    height: 1px;
    background: rgba(206, 197, 197, 0.7);
  }
  .info-pannel-body {
    margin-top: 10px;
    transition: height .5s;
    overflow: hidden;
  }
}
</style>
