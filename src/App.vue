<template>
  <div id="app">
    <router-view v-if="isRouterAlive">
    </router-view>
  </div>
</template>
<script>
  export default {
    name: 'App',
    provide (){
      return {
        reload:this.reload
      }
    },
    data(){
      return {
        isRouterAlive:true
      }
    },
    methods:{
      reload (){
        this.isRouterAlive = false
        this.$nextTick(function(){
          this.isRouterAlive = true
        })
      }
    },
    components:{
    }
  }
</script>

<style>

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
