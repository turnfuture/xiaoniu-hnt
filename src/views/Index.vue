<template>
  <div class="wrapper">
    <lsl-header></lsl-header>

    <div :class="$style['index-content']" :style="{height: innerHeight + 'px'}" ref="wrapper">
      <div class="contents">
        <lsl-banner page="index" :imgs="banners"></lsl-banner>

        <div class="content">
          <!-- 关于我们 -->
          <div :class="$style.about">
            <img src="../assets/img/index-01.png" alt="首页图片">
            <div class="container" :class="$style.con">
              <lsl-aside
                :class="$style['lsl-aside']"
                :aside-list="asides"
                :style="{'top': aboutTop + 'px'}"
              >
                <h2>About us</h2>
                <p>品牌故事</p>
                <span></span>
              </lsl-aside>
              <div :class="$style['about-details']" :style="{'top': aboutbot + 'px'}">
                <h3>鹤年堂中药饮片有限责任公司</h3>
                <div v-html="companyDes"></div>
                <el-button type="danger" @click="details">查看详情>></el-button>
              </div>
            </div>
          </div>
          <div :class="$style.product">
            <div class="container" :class="$style.title" :style="{top: productTop + 'px'}">
              <img src="../assets/img/index-product.png" alt="产品-title">
            </div>
            <div :class="$style['pro-banner']">
              <img src="../assets/img/index-project1.png" alt="产品banner">
            </div>
            <div class="container" :class="$style['pro-details']" :style="{top: productBot + 'px'}">
              <ul>
                <li
                  v-for="(item, index) in products"
                  :key="item.id"
                >
                  <div :class="$style['li-content']"
                    @click="bindDetails(item.id)"
                    @mouseenter="selectStyle(index) "
                    @mouseleave="outStyle(index)"
                  >
                      <div :class="$style.pic">
                        <img :src="item.icon" alt="产品图片">
                      </div>
                      <p>{{item.title}}</p>
                      <transition name="fade">
                        <div v-show="item.active" class="proHover">
                          {{item.title}}
                        </div>
                      </transition>
                  </div>
                </li>
              </ul>
              <el-button plain @click="bindProductList">查看详情>></el-button>
            </div>
          </div>
          <!-- 专业贴牌 -->
          <div :class="$style.profess">
            <div class="container" :class="$style.title" :style="{top: professTop + 'px'}">
              <img src="../assets/img/profess.png" alt="专业贴牌-title">
            </div>
            <div :class="$style.professContent" style="opacity: 1;">
                <div :class="$style.professImg" class="container" :style="{top: professBot + 'px'}">
                  <div :class="$style.img"><img src="../assets/img/profess-1.png" alt="专业贴牌"></div>
                  <div :class="$style.img"><img src="../assets/img/profess-2.png" alt="专业贴牌"></div>
                </div>
            </div>
          </div>
          <div :class="$style.news" class="container">
            <div :class="$style.title" class="container" :style="{top: newsTop + 'px'}">
              <img src="../assets/img/index-news.png" alt="产品-title">
            </div>
            <div class="container" :class="$style.newsContent" :style="{top: newsBot + 'px'}">
                <div :class="$style.btn">
                  <el-button v-for="(item, index) in news"
                    :key="item.id"
                    :class="currentNew === index ? $style.newActive : ''"
                    @click="attrList(index, item.id)"
                  >
                    {{item.title}}
                  </el-button>
                </div>
                <transition name="newsFade">
                    <div :class="$style.details" v-if="list.length > 0">
                      <div :class="$style.pic">
                        <img :src="list[0].icon" alt="新闻图片">
                      </div>
                      <div :class="$style.right">
                        <ul>
                          <li v-for="item in list" :key="item.id">
                            <h3>{{ item.title}}</h3>
                            <p>
                              {{item.describe}}
                              <router-link :to="{ name: 'details', params: { type: 'news', id: item.id } }">查看详情》</router-link>
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                </transition>
            </div>
          </div>
          <!-- 资质荣誉 -->
          <div :class="$style.quali" class="container">
            <div :class="$style.title" class="container" :style="{top: qualiTop + 'px'}">
              <img src="../assets/img/quali.png" alt="资质荣誉-title">
            </div>
            <ul class="container" :class="$style.qualiImg" :style="{top: qualiBot + 'px'}">
              <li>
                  <img src="../assets/img/quali-1.png" alt="资质荣誉">
                  <img src="../assets/img/quali-2.png" alt="资质荣誉">
              </li>
              <li>
                <img src="../assets/img/quali-3.png" alt="资质荣誉">
              </li>
              <li>
                <img src="../assets/img/quali-4.png" alt="资质荣誉">
              </li>
            </ul>
          </div>
          <!-- 合作伙伴 -->
          <div :class="$style.part" class="container">
            <div :class="$style.title" class="container" :style="{top: partTop + 'px'}">
              <img src="../assets/img/partners.png" alt="合作伙伴-title">
            </div>
            <div class="container" :class="$style.partImg" :style="{top: partBot + 'px'}">
              <img src="../assets/img/index-part.png" alt="合作伙伴">
            </div>
          </div>
        </div>

        <lsl-footer></lsl-footer>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
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
      innerHeight: 500,
      banners: [],
      asides: [],
      companyDes: '',
      products: [],
      news: [],
      currentNew: 0,
      list: [],
      aboutTop: -70,
      aboutbot: 130,
      // 关于我们滚动
      productTop: 0,
      productBot: 200,
      professTop: 0,
      professBot: 450,
      newsTop: 0,
      newsBot: 120,
      qualiTop: 0,
      qualiBot: 120,
      partTop: 0,
      partBot: 120
    }
  },
  mounted() {
    this.initBanner();
    this.initCompany();
    this.initProduct();
    this.initNews();
    
    this.innerHeight = window.innerHeight - 100
    
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {
        scroll: this.scrolls,
        lick: true,
        probeType: 1, //这个属性设置之后可以监听得到了
        mouseWheel: true,
        scrollbar: {
          fade: true
        }
      })
      this.scroll.on('scroll', pos => {
        console.log(pos)
        const scrollTop = -pos.y
        if (scrollTop >= 400 && scrollTop <= 1000) {
          // 关于我们标题
          this.aboutTop = - (600 - scrollTop) / 4
          this.aboutbot = (250 + scrollTop) / 5
          if (scrollTop >= 700) {
            this.aboutTop = 25
          }
          // 关于我们内容
          if (scrollTop >= 900) {
            this.aboutbot = 230
          }
        } else if (scrollTop >= 1100 && scrollTop <= 1900) {
          this.productTop = (scrollTop - 1100) / 2
          this.productBot = (scrollTop - 700) / 2
          if (scrollTop >= 1400) {
            this.productTop = 150
          }
          if (scrollTop >= 1900){
              this.productBot = 600
          } 
        } else if (scrollTop >= 2300 && scrollTop <= 2600) {
          this.professTop = (scrollTop - 2300) / 4
          this.professBot = (-scrollTop + 3200) / 2
          if (scrollTop >= 2600) {
            this.professTop = 150
            this.professBot = 300
          }
        } else if (scrollTop >= 2800 && scrollTop <= 3400) {
          this.newsTop = (scrollTop - 2800) / 4
          this.newsBot = (scrollTop - 2400) / 4
          if (scrollTop >= 3200) {
            this.newsTop = 50
          }
          if (scrollTop == 3400) {
            this.newsBot = 250
          }
        } else if (scrollTop >= 3700 && scrollTop <= 4200) {
          this.qualiTop = (scrollTop - 3700) / 4
          this.qualiBot = (scrollTop - 3200) / 3
          if (scrollTop >= 4000) {
            this.qualiTop = 100
          }
          if (scrollTop == 4200) {
            this.qualiBot = 250
          }
        } else if (scrollTop >= 4500 && scrollTop <= 4800) {
          this.partTop = (scrollTop - 4500) / 4
          this.partBot = (scrollTop - 4100) / 3
          if (scrollTop >= 4700) {
            this.partTop = 50
          }
          if (scrollTop == 4800) {
            this.partBot = 250
          }
        }
      })
    })
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
          let list = res.data.list
          list.forEach(function(item) {
            item.active = false
          });
          this.products = list
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
    },
    selectStyle(index) {
      this.products[index].active = true
    },
    outStyle(index) {
      this.products[index].active = false
    },
    scrolls() {
      // const scrollTop = document.documentElement.scrollTop
      // console.log(scrollTop)
      // if (scrollTop >= 320 && scrollTop <= 600) {
      //   this.aboutTop = - (600 - scrollTop) / 4
      // } else if (scrollTop >= 400 && scrollTop <= 900) {
      //   this.aboutbot = (250 + scrollTop) / 5
      // }
    }
  }
}
</script>
<style lang="scss">
/* hover效果 */
.proHover {
  color: #fff;
  line-height: 291px;
  background: #D2393D;
  opacity: .9;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  height: 291px;
  text-align: center;
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to {
  height: 0;
  opacity: 0;
}
</style>

<style lang="scss" module>
  $color: #D2393D;
  .index-content {
    margin-top: 100px;
    overflow: hidden;
    height: 500px;
    transition: all .5s;
  }
  
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
      transition: top .8s;

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
        height: 4px;
        display: inline-block;
        background: #F0F0F1;
        margin-top: 10px;
      }
    }

    .about-details {
      background: #F2F2F2;
      position: absolute;
      top: 130px;
      right: 0;
      width: 829px;
      padding: 50px 30px;
      box-sizing: border-box;
      transition: top .8s;

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

  /* 产品 */
  .product {
    margin-top: 200px;
    height: 1150px;
    position: relative;
    padding-top: 120px;
    
    .pro-banner {
      min-height: 480px;
    }
    
    .pro-banner img {
        width: 100%;
    }

    .pro-details {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      transition: top .5s;

      ul {
        display: flex;
        align-items: center;
        flex-flow: row wrap;
        padding-left: 0;
        margin-top: 0;

        li {
          width: 23%;
          height: 291px;
          margin-right: 2.66%;
          margin-bottom: 25px;
          list-style: none;
          box-sizing: border-box;
          border: 1px solid #dcdcdc;

          &:nth-child(4n) {
            margin-right: 0;
          }
          
          .li-content {
            height: 100%;
            padding: 25px;
            box-sizing: border-box;
            padding-bottom: 0;
            background: #fff;
            cursor: pointer;
            position: relative;
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
  
  .profess {
    position: relative;
    margin-top: 80px;
    padding: 120px 0 80px;
    
    .professContent {
        height: 400px;
        background: url(../assets/img/project.png) no-repeat;
        background-size: cover;
        padding: 80px;
    }
      
    .professImg {
      overflow: hidden;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      transition: top .5s;
          
      .img {
        float: left;
        width: 48%;
        height: 300px;
        margin-right: 4%;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
              
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  /* 新闻 */
  .newsFade-enter-active, .newsFade-leave-active {
    transition: opacity 1s;
  }
  
  .newsFade-enter, .newsFade-leave-to {
    opacity: 0;
  }
  
  .news {
    position: relative;
    margin: 30px auto;
    padding-top: 120px;
    height: 630px;

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
    
    .newsContent {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      transition: top .5s;
    }

    .details {
      display: flex;
      align-items: center;
      padding: 50px 0 0;

      .pic {
        width: 400px;
        height: 400px;
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
            margin-bottom: 30px;

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
              
              &:hover {
                color: $color;
              }
            }
          }
        }
      }
    }
  }
  
  .title {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: top .5s;
    
    img {
      height: 90px;
      margin-bottom: 30px;
    }
  }
  
  /* 合作伙伴 */
  .quali {
    position: relative;
    padding: 120px 0 0;
    overflow: hidden;
    height: 700px;
    
    .qualiImg {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      overflow: hidden;
      transition: top .5s;
      padding: 0;
        
      li {
        float: left;
        width: 31%;
        margin-right: 3.5%;
        list-style: none;
      
        img {
          width: 100%;
        }
      
        &:first-child img:first-child {
          margin-bottom: 10px;
        }
      }
    }
    
    .qualiImg li:nth-child(3n) {
      margin-right: 0;
    }
  }
  
  .part {
    position: relative;
    padding-top: 120px;
    height: 500px;
    margin-bottom: 100px;
    
    .partImg {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      overflow: hidden;
      transition: top .5s;
      padding: 0;
      
      img {
        width: 100%;
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
