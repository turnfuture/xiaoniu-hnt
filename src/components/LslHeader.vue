<template>
  <header>
    <div class="logo">
      <router-link to="/">
        <img src="../assets/img/logo.png">
      </router-link>
    </div>
    <nav class="fr">
      <router-link v-for="(item,i) in navList" :key="i" class="alignCenter" :class="url== i ? 'active' : ''" :to="item.url">
        {{ item.name }}
        </router-link>
    </nav>
  </header>
</template>

<script>

export default {
  name: 'lslHeader',
  props: {
    url: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      navList: [{
        name: '首页',
        url: '/'
      }, {
        name: '关于鹤年堂',
        url: '/company'
      }, {
        name: '产品中心',
        url: '/product'
      }, {
        name: '招商加盟',
        url: '/plan'
      }, {
        name: '专业贴牌',
        url: '/project'
      }, {
        name: '新闻中心',
        url: '/news'
      }, {
        name: '联系我们',
        url: '/contact'
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  header {
    width: 1099px;
    height: 100px;
    overflow: hidden;
    margin: 0 auto;
  }
  @media screen and (max-width: 1098px) {
    header {
      width: 979px;
    }
  }
  .logo {
    width: 64px;
    height: 80px;
    margin: 10px 0;
    float: left;
  }
  .logo img {
    width: 100%;
    height: 100%;
  }
  nav {
    width: 770px;
    float: right;
    margin-right: -20px;
  }
  nav a {
    width: 110px;
    display: inline-block;
    line-height: 100px;
    color: #2c3e50;
    text-align: center;
    text-decoration: none;
  }
  nav a.active, nav a:hover {
    color: #D2393D;
  }
</style>
