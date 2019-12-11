<template>
  <div class="banner">
    <template v-if="page === 'index'">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="item in imgs" :key="item.id">
          <img :src="item.url" alt="banner">
        </swiper-slide>
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
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .banner {
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
