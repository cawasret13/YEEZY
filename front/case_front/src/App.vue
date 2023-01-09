<template>
  <div class="bg">
    <img src="@/assets/bg.png" alt="">
  </div>
  <router-view/>
</template>

<script>
  import Header from '../src/components/Header.vue'
  export default{
    components:{
      Header,
    }
  }
</script>
<style>
  body{
    padding: 0;
    margin: 0;
    background-color: #18191e;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  .bg{
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: -10;
    width: 100%;
    height: 100%;
  }
  .bg img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>