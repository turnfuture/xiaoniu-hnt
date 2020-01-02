<template>
  <div class="wrapper">
    <!-- 头部-banner -->
    <lsl-header :url="3"></lsl-header>
    <lsl-banner :imgs="banner"></lsl-banner>

    <div class="container" :class="$style.content">
      <!-- 左侧导航栏 -->
      <lsl-aside
        :aside-list="asides"
        @bind-current="parentListen"
        >
        <h2>To Join In</h2>
        <p>招商加盟</p>
      </lsl-aside>

      <div :class="$style['pro-right']">
        <ul :class="$style['pro-content']">
          <template v-if="list.length > 0">
          <li v-for="item in list" :key="item.id">
            <router-link :to="{ name: 'details', params: { type: 'plan', id: item.id } }">
              <div :class="$style.pic">
                <img :src="item.icon" alt="招商加盟">
              </div>
              <div :class="$style['pro-li-tet']">
                {{ item.title }}
              </div>
            </router-link>
          </li>
          </template>
          <template v-else>
            <p :class="$style['none-margin']">暂无</p>
          </template>
        </ul>
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
  name: 'Product',
  data() {
    return {
      banner: require('../assets/img/plan.jpg'),
      asides: [{
        title: '',
        content: ''
      }],
      current: 0,
      list: [],
      pageSize: '20',     // 分页
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
      // 初始化轮播图
      this.$dataPost('/api/cms/solution/type', {}, (res) => {
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
      this.$dataPost('/api/cms/solution/list', {
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
  .content {
    display: flex;

    .pro-right {
      flex: 1;
      padding: 40px 0 40px 20px;

      .pro-content {
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding-left: 0;

        li {
          width: 23%;
          height: 251px;
          margin-right: 2.66%;
          list-style: none;

          &:nth-child(4n) {
            margin-right: 0;
          }

          a {
            display: block;
            height: 100%;
            text-decoration: none;
          }

          .pic {
            width: 100%;
            height: 195px;
            border: 1px solid #e5e5e5;
            box-sizing: border-box;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }
          }

          .pro-li-tet {
            line-height: 56px;
            color: #2c3e50;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
          }
        }
      }
    }
  }

  .none-margin {
    margin: 0;
    padding-left:30px;
  }

  @media screen and (max-width: 1098px) {
    .content .pro-right .pro-content {
      li {
        height: 210px;

        .pic {
          height: 170px
        }

        .pro-li-tet {
          line-height: 40px;
        }
      }
    }
  }
</style>
