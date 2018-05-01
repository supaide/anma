<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    var $body = document.querySelector('body');
    $body.style.width = this.$store.state.config.width + 'px';
    $body.style.height = this.$store.state.config.height + 'px';
    $body.style.backgroundImage = 'url(/static/img/bg.jpg)';
  }
}
</script>

<style>
body {
  background-size: cover;
  background-repeat: no-repeat;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
