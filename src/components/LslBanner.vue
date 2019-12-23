<template>
  <div class="banner">
    <template v-if="page === 'index'">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="item in imgs" :key="item.id">
          <img :src="item.url" alt="banner">
        </swiper-slide>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </template>
    <template v-else>
      <img :src="imgs" alt="banner">
    </template>
  </div>
</template>

<script>

export default {
  name: 'lslBanner',
  props: {
    page: {
      type: String,
      default: 'other'
    },
    imgs: {
      type: [String, Array]
    }
  },
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        loop: true,
        initialSlide: 0,
        effect: 'fade',
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets'
        }
      }
    }
  }
}
</script>

<style>
.swiper-container{
  --swiper-theme-color: #ff6600;/* 设置Swiper风格 */
  --swiper-navigation-color: #00ff33;/* 单独设置按钮颜色 */
  --swiper-navigation-size: 30px;/* 设置按钮大小 */
}
.swiper-button-prev, .swiper-button-next {
  height: 44px !important;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .banner {
    margin-top: 100px;
      
    div {
      height: 500px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      min-height: 300px;
    }
  }
  .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: -464px;
  }
  .swiper-pagination-bullet-active {
    background: #0069B7;
  }
</style>
