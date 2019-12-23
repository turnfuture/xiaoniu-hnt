import Vue from 'vue'
import App from './App.vue'
import router from './router'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import './assets/css/normalize.css'
// 请求接口封装
import {dataGet, dataPost} from './utils/axios.js'
// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// 引入vue-amap
import AMap from 'vue-amap'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$dataGet = dataGet
Vue.prototype.$dataPost = dataPost

Vue.config.productionTip = false
Vue.use(require('vue-wechat-title'))
Vue.use(VueAwesomeSwiper)
Vue.use(AMap)
Vue.use(ElementUI)

AMap.initAMapApiLoader({
  // 高德key
  key: 'ee0e3a51d00f96a3afe0827d1e6d879f',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
})

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
