<template>
  <div class="wrapper">
    <!-- 头部-banner -->
    <lsl-header :url="url"></lsl-header>
    <lsl-banner :imgs="banner"></lsl-banner>

    <div class="container" :class="$style.content">
      <div :class="$style['com-nav']">
        <router-link to='/'>
          <img src="../assets/img/icon-home.png" alt="home">
          首页
        </router-link>
        >
        <router-link :to="'/' + type">
          <template v-if="type === 'product'">产品中心</template>
          <template v-else-if="type === 'plan'">招商加盟</template>
          <template v-else-if="type === 'project'">专业贴牌</template>
          <template v-else>新闻中心</template>
        </router-link>
        >
        <span>{{ info.title }}</span>
      </div>
      <div :class="$style['pro-content']">
        <h2>{{ info.title }}</h2>
        <h6>{{ info.updateAt | DateTime }}</h6>
        <div v-html="info.content"></div>
      </div>
    </div>
    <lsl-footer></lsl-footer>
  </div>
</template>

<script>
export default {
  name: 'allDetails',
  filters: {
    DateTime (val) {
      if (val && val.length > 10) {
        val = val.substring(0, 10)
      }
      return val
    }
  },
  computed: {
    type() {
      // 地址栏参数第一个参数type
      return this.$route.params.type
    },
    id() {
      // 地址栏参数第二个参数id
      return this.$route.params.id
    },
    url() {
      // header当前状态
      return this.type === 'product' ? 2 : this.type === 'plan' ? 3 : this.type === 'project' ? 4 : 5
    },
    banner() {
      // banner图片
      return require(`../assets/img/${this.type}.png`)
    },
  },
  data() {
    return {
      info: {},
      loading: {}
    }
  },
  mounted() {
    this.loading = this.$loading({
      lock: true,
      text: 'Loading',
    });
    switch(this.type) {
      case 'product':
      this.initProduct();
      break;
      case 'plan':
        this.initPlan();
        break;
      case 'project':
        this.initProject();
        break;
      default:
        this.initNews();
        break;
    }
  },
  methods: {
    initProduct() {
      // 初始化产品详情
      this.$dataPost('/api/cms/achieve/info', {
        id: this.id
      }, (res) => {
        this.loading.close();
        if (res.code === 0) {
          this.info = res.data;
        }
      })
    },
    initPlan() {
      // 初始化招商加盟详情
      this.$dataPost('/api/cms/solution/info', {
        id: this.id
      }, (res) => {
        this.loading.close();
        if (res.code === 0) {
          this.info = res.data;
        }
      })
    },
    initProject() {
      // 初始化专业贴牌详情
      this.$dataPost('/api/cms/develop/info', {
        id: this.id
      }, (res) => {
        this.loading.close();
        if (res.code === 0) {
          this.info = res.data;
        }
      })
    },
    initNews() {
      // 初始化专业贴牌详情
      this.$dataPost('/api/cms/news/info', {
        id: this.id
      }, (res) => {
        this.loading.close();
        if (res.code === 0) {
          this.info = res.data;
        }
      })
    }
  }
}
</script>

<style lang="scss" module>
  $color: #D2393D;
  .content {
    /* 小导航栏 */
    .com-nav {
      font-size: 14px;
      width: 100%;
      text-align: right;
      margin: 30px 0 40px;

      a {
        text-decoration: none;
        color: #2c3e50;

        img {
          width: 18px;
          height: 18px;
          position: relative;
          top: 3px;
        }
      }

      span {
        color: #0069B7;
        cursor: pointer;
      }
    }
  }

  .pro-content {
    text-align: center;
    margin-bottom: 40px;

    h2 {
      font-size: 32px;
      color: $color;
      font-weight: normal;
      margin: 0;
    }

    h6 {
      color: $color;
      margin: 8px 0 40px;
    }
    
    div {
      text-align: left;
    }
  }
</style>
