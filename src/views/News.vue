<template>
  <div class="wrapper">
    <!-- 头部-banner -->
    <lsl-header :url="5"></lsl-header>
    <lsl-banner :imgs="banner"></lsl-banner>

    <div class="container" :class="$style.content">
      <!-- 左侧导航栏 -->
      <lsl-aside
        :aside-list="asides"
        @bind-current="parentListen"
        >
        <h2>News center</h2>
        <p>新闻中心</p>
      </lsl-aside>

      <div :class="$style['pro-right']">
        <div :class="$style['com-content']">
          <ul>
            <template v-if="list.length > 0">
              <li v-for="item in list" :key="item.id">
                <router-link :to="{ name: 'details', params: { type: 'news', id: item.id } }">
                  <div :class="$style['new-pic']">
                      <img :src="item.icon" alt="图片">
                  </div>
                  <div :class="$style['new-main']">
                    <h4>{{ item.title }}</h4>
                    <h5>{{ item.updateAt | DateTime }}</h5>
                    <p>{{ item.describe }}</p>
                    <button>查看详情》</button>
                  </div>
                </router-link>
              </li>
            </template>
            <template v-else>
              <p :class="$style['none-margin']">暂无</p>
            </template>
          </ul>
        </div>
        <!-- 分页 -->
        <ul class="pagination" v-if="list.length > 0">
          <li v-show="currentPage != 1" @click="currentPage-- && goto(currentPage--)" >
            <span>上一页</span>
          </li>
          <li v-for="index in pages" @click="goto(index)" :class="{'active':currentPage == index}" :key="index">
            <span>{{index}}</span>
          </li>
          <li v-show="allpage != currentPage && allpage != 0 " @click="currentPage++ && goto(currentPage++)">
            <span>下一页</span>
          </li>
        </ul>
      </div>
    </div>
    <lsl-footer></lsl-footer>
  </div>
</template>

<script>
export default {
  name: 'news',
  filters: {
    DateTime (val) {
      if (val && val.length > 10) {
        val = val.substring(0, 10)
      }
      return val
    }
  },
  data() {
    return {
      banner: require('../assets/img/news.jpg'),
      asides: [{
        title: '',
        content: ''
      }],
      current: 0,
      list: [],
      pageSize: '12',     // 分页
      currentPage: 1,         // 分页
      showItem: 5,
      allpage: 1,
    }
  },
  computed: {
    pages: function () {
      var pag = []
      if (this.currentPage < this.showItem) {
        // 如果当前的激活的项 小于要显示的条数
        // 总页数和要显示的条数那个大就显示多少条
        var i = Math.min(this.showItem, this.allpage)
        while (i) {
          pag.unshift(i--)
        }
      } else {
        var middle = this.currentPage - Math.floor(this.showItem / 2)
        var j = this.showItem
        if (middle > (this.allpage - this.showItem)) {
          middle = (this.allpage - this.showItem) + 1
        }
        while (j--) {
          pag.push(middle++)
        }
      }
      return pag
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 初始化
      this.$dataPost('/api/cms/news/type', {}, (res) => {
        if (res.code === 0) {
          this.asides = res.data;
          this.attrList(res.data[0].id, 1);
        }
      })
    },
    goto (index) {
      // 分页
      if (index === this.currentPage) return;
      this.currentPage = index;
      this.attrList(this.asides[this.current].id, index);
    },
    attrList (id, page) {
      // 通过分类ID获取数据
      this.$dataPost('/api/cms/news/list', {
        'typeId': id,
        'pageSize': this.pageSize,
        'pageNumber': page
      }, (res) => {
        if (res.code === 0) {
          this.list = res.data.list
          this.allpage = res.data.lastPage
        }
      })
    },
    parentListen(index) {
      this.current = index;
      this.currentPage = 1;
      this.attrList(this.asides[index].id, 1);
    }
  }
}
</script>

<style lang="scss" module>
  $m20: 20px;
  $m15: 12px;
  .content {
    display: flex;

    .pro-right {
      flex: 1;
      padding: 40px 0 40px $m20;

      .com-content ul {
        padding-left: 0;

        li {
          margin-bottom: $m20;
          list-style: none;

          a {
            display: flex;
            text-decoration: none;
          }
          
          .new-pic {
            width: 160px;
            height: 160px;
            border: 1px solid #e5e5e5;
            box-sizing: border-box;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .new-main {
            flex: 1;
            padding: 10px $m15;
            background: #F7F7F7;

            h4 {
              color: #000;
              margin: $m15 0;
            }

            h5 {
              font-size: 14px;
              color: #525252;
              margin: $m15 0;
            }

            p {
              font-size: 14px;
              color: #525252;
              margin: $m15 0;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }

            button {
              font-size: 12px;
              color: #A0A0A0;
              width: 90px;
              height: 30px;
              border: 1px solid #A0A0A0;
              box-sizing: border-box;
              padding: 0;
              border-radius: $m15;
              background: transparent;
            }
          }
          &:hover .new-main{
            box-shadow:0px 4px 8px 0px rgba(107,107,107,0.2);
          }
        }
      }
    }
  }

  .none-margin {
    margin: 0;
    padding-left:30px;
  }
</style>
