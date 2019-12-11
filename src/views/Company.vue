<template>
  <div class="wrapper">
    <!-- 头部-banner -->
    <lsl-header :url="1"></lsl-header>
    <lsl-banner :imgs="banner"></lsl-banner>
    <div class="container" :class="$style.content">
      <!-- 左侧导航栏 -->
      <lsl-aside
        :aside-list="asides"
        @bind-current="parentListen"
        >
        <h2>About us</h2>
        <p>关于鹤年堂</p>
      </lsl-aside>

      <div :class="$style.main">
        <div :class="$style['main-title']">
          {{asides[current].title}}
        </div>
        <div :class="$style['main-text']" v-html="asides[current].content"></div>
      </div>
    </div>
    <lsl-footer></lsl-footer>
  </div>
</template>

<script>
export default {
  name: 'Company',
  data() {
    return {
      banner: require('../assets/img/about.png'),
      asides: [{
        title: '',
        content: ''
      }],
      current: 0
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 初始化数据
      this.$dataPost('/api/cms/about/list', {
        'pageSize': '10',
        'pageNumber': '1'
      }, (res) => {
        this.asides = res.data.list;
      })
    },
    parentListen(index) {
      // 获取子组件的下标
      this.current = index;
    }
  }
}
</script>

<style lang="scss" module>
  .content {
    display: flex;

    .main {
      flex: 1;
      padding-left: 20px;
      padding-bottom: 40px;

      .main-title {
        font-size: 32px;
        color: #D2393D;
        text-align: center;
        margin: 35px 0;
      }
    }
  }
</style>