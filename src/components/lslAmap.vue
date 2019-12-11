<template>
  <div class="amap-page-container">
    <el-amap vid="amap" :zoom="zoom" class="amap-demo" :center="center"></el-amap>
  </div>
</template>

<script>
export default {
  data () {
    return {
      center: [115.762993,33.793323],
      zoom: 16
    }
  }
}
</script>

<style>
  .amap-page-container {
    height: 380px;
    border: 1px solid #0069B7;
  }
</style>
