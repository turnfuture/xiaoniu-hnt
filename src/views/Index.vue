<template>
  <div class="wrapper">
    <lsl-header></lsl-header>

    <lsl-banner page="index" :imgs="banners"></lsl-banner>

    <div class="content">
      <div :class="$style.about">
        <img src="../assets/img/index-01.png" alt="首页图片">
        <div class="container" :class="$style.con">
          <lsl-aside
            :class="$style['lsl-aside']"
            :aside-list="asides">
            <h2>About us</h2>
            <p>走进鹤年堂</p>
            <span></span>
          </lsl-aside>
          <div :class="$style['about-details']">
            <h3>鹤年堂中药饮片有限责任公司</h3>
            <div v-html="companyDes"></div>
            <el-button type="danger" @click="details">查看详情>></el-button>
          </div>
        </div>
      </div>
      <div :class="$style.product">
        <div class="container" :class="$style.title">
          <img src="../assets/img/index-product.png" alt="产品-title">
        </div>
        <div :class="$style['pro-banner']">
          <img src="../assets/img/index-project1.png" alt="产品banner">
        </div>
        <div class="container" :class="$style['pro-details']">
          <ul>
            <li v-for="item in products" :key="item.id" @click="bindDetails(item.id)">
              <div :class="$style.pic">
                <img :src="item.icon" alt="产品图片">
              </div>
              <p>{{item.title}}</p>
            </li>
          </ul>
          <el-button plain @click="bindProductList">查看详情>></el-button>
        </div>
      </div>
       <div :class="$style.news" class="container">
        <div :class="$style.title">
          <img src="../assets/img/index-news.png" alt="产品-title">
        </div>
        <div :class="$style.btn">
          <el-button v-for="(item, index) in news"
            :key="item.id"
            :class="currentNew === index ? $style.newActive : ''"
            @click="attrList(index, item.id)"
          >
            {{item.title}}
          </el-button>
        </div>
        <div :class="$style.details" v-if="list.length > 0">
          <div :class="$style.pic">
            <img :src="list[0].icon" alt="新闻图片">
          </div>
          <div :class="$style.right">
            <ul>
              <li v-for="item in list" :key="item.id">
                <h3>{{ item.updateAt | DateTime }}</h3>
                <p>
                  {{item.title}}
                  <router-link :to="{ name: 'details', params: { type: 'news', id: item.id } }">查看详情》</router-link>
                </p>
              </li>
            </ul>
          </div>
        </div>
       </div>
    </div>

    <lsl-footer></lsl-footer>
  </div>
</template>

<script>
export default {
  name: 'Index',
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
      banners: [],
      asides: [],
      companyDes: '',
      products: [],
      news: [],
      currentNew: 0,
      list: []
    }
  },
  mounted() {
    this.initBanner();
    this.initCompany();
    this.initProduct();
    this.initNews();
  },
  methods: {
    initBanner() {
      // 初始化轮播图
      this.$dataPost('/api/cms/slide/list', {
        type: 0
      }, (res) => {
        if (res.code === 0) {
          this.banners = res.data
        }
      })
    },
    initCompany() {
      // 初始化公司介绍
      this.$dataPost('/api/cms/about/list', {
        'pageSize': '10',
        'pageNumber': '1'
      }, (res) => {
        let description = res.data.list[0].content;
        description = description.replace(/(\n)/g, '');  
        description = description.replace(/(\t)/g, '');  
        description = description.replace(/(\r)/g, '');  
        description = description.replace(/<\/?[^>]*>/g, '');  
        description = description.replace(/\s*/g, '');
        this.companyDes = description;
      })
    },
    initProduct() {
      // 初始化产品中心
      this.$dataPost('/api/cms/achieve/list', {
        "typeId":"",
        "pageSize":"8",
        "pageNumber":"1"
      }, (res) => {
        if (res.code === 0) {
          this.products = res.data.list
        }
      })
    },
    initNews() {
      // 初始化新闻
      this.$dataPost('/api/cms/news/type', {}, (res) => {
        if (res.code === 0) {
          this.news = res.data.slice(0, 4);
          this.attrList(0, res.data[0].id);
        }
      })
    },
    attrList (index, id) {
      this.currentNew = index;
      // 通过分类ID获取数据
      this.$dataPost('/api/cms/news/list', {
        'typeId': id,
        'pageSize': 5,
        'pageNumber': 1
      }, (res) => {
        if (res.code === 0) {
          this.list = res.data.list
        }
      })
    },
    details() {
      // 公司介绍
      this.$router.push('/company');
    },
    bindDetails(id) {
      // 产品详情
      this.$router.push({name: 'details', params: {type: 'product', id}})
    },
    bindProductList() {
      this.$router.push('/product');
    }
  }
}
</script>

<style lang="scss" module>
  $color: #D2393D;
  .banner {
    height: 540px;

    div {
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .about {
    margin-top: 100px;
    position: relative;

    > img {
      width: 100%;
      min-height: 440px;
      display: block;
    }

    .con {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

    .lsl-aside {
      position: absolute;
      top: -70px;;
      margin-top: 0;
      padding: 0;
      width: 270px;
      height: 220px;
      box-sizing: border-box;

      > div {
        padding: 20px 20px 20px;
        align-items: flex-start;
        color: #F0F0F1;
      }

      h2 {
        font-size: 42px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      p {
        font-size: 22px;
      }

      span {
        width: 130px;
        height: 5px;
        display: inline-block;
        background: #F0F0F1;
        margin-top: 10px;
      }
    }

    .about-details {
      background: #F2F2F2;
      position: absolute;
      top: 160px;
      right: 0;
      width: 829px;
      padding: 50px 30px;
      box-sizing: border-box;

      h3 {
        font-size: 30px;
        color: $color;
        font-weight: normal;
        margin: 0 0 25px;
      }

      div {
        font-size: 14px;
        color: #535353;
        line-height: 1.8em;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 8;
        overflow: hidden;
      }

      button {
        margin-top: 10px;
        background: $color;
      }
    }
  }

  .product {
    margin-top: 200px;

    .title img {
      width: 266px;
      margin-bottom: 30px;
    }

    .pro-banner {
      min-height: 480px;
    }

    .pro-details {
      margin-top: -118px;

      ul {
        display: flex;
        align-items: center;
        flex-flow: row wrap;
        padding-left: 0;
        margin-top: -145px;

        li {
          flex: 1;
          width: 23%;
          margin-right: 2.66%;
          margin-bottom: 25px;
          list-style: none;
          box-sizing: border-box;
          border: 1px solid #dcdcdc;
          padding: 25px;
          padding-bottom: 0;
          background: #fff;
          cursor: pointer;

          &:nth-child(4n) {
            margin-right: 0;
          }

          .pic {
            height: 200px;
          }

          .pic img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          p {
            font-size: 16px;
            line-height: 2em;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      button {
        border-color: $color;
        color: $color;
        margin: 0 auto;
        display: table;
      }
    }
  }

  .news {
    margin: 80px auto 100px;

    .title img {
      width: 266px;
      margin-bottom: 30px;
    }

    .btn {
      text-align: center;

      button {
        margin-right: 20px;

        &.newActive {
          color: #fff;
          background: $color;
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .details {
      display: flex;
      align-items: center;
      padding: 50px 0 0;

      .pic {
        width: 480px;
        height: 480px;
        border: 1px solid #eee;
        box-sizing: border-box;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .right {
        flex: 1;
        padding: 0 30px;

        ul {
          padding: 0;

          li {
            list-style: none;
            margin-bottom: 35px;

            &:last-child {
              margin-bottom: 0;
            }

            h3 {
              margin: 13px 0;
            }

            p {
              margin: 13px 0;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
              padding-right: 88px;
              position: relative;
            }

            a {
              color: #2e3c50;
              text-decoration: none;
              float: right;
              position: absolute;
              top: 0;
              right: 0;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1098px) {
    .about-details {
      width: 709px !important;
    }
    .product {
      margin-top: 230px;
    }
  }
</style>
