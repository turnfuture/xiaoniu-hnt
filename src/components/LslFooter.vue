<template>
  <footer>
    <div class="footer">
      <div class="footer-info">
        <div class="g-left">
          <ul>
            <li>
              <h5><router-link to="/">首页</router-link></h5>
            </li>
            <li>
              <h5><router-link to="/company">品牌故事</router-link></h5>
            </li>
            <li>
              <h5><router-link to="/product">产品中心</router-link></h5>
            </li>
            <li>
              <h5><router-link to="/plan">招商加盟</router-link></h5>
            </li>
            <li>
              <h5><router-link to="/project">专业贴牌</router-link></h5>
            </li>
            <li>
              <h5><router-link to="/news">新闻中心</router-link></h5>
            </li>
            <li>
              <h5><router-link to="/contact">联系我们</router-link></h5>
            </li>
          </ul>
        </div>
        <div class="g-company">
          <div class="bg">
            <img src="../assets/img/logo.png" alt="logo">
          </div>
          <p>安徽鹤年堂中药饮片有限公司</p>
        </div>
        <div class="g-contact">
          <p>地址：安徽省亳州市经济开发区百合路888号</p>
          <p>电话：0558-5809888</p>
        </div>
      </div>
    </div>
    <div class="icp">
      版权所有 © 安徽鹤年堂中药饮片有限责任公司
    </div>
  </footer>
</template>

<script>
export default {
  name: 'lslFooter',
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
  .footer {
    background: #313131;
  }
  .footer-info {
    width: 1099px;
    margin: 0 auto;
    height: 130px;
    display: flex;
    align-items: center;

    .g-left {
      flex: 4.5;

      ul {
        display: flex;
        align-items: center;
        padding: 0;

        li {
          padding-right: 27px;
          list-style: none;

          a {
            text-decoration: none;
            color: #898989;
          }
        }
      }
    }

    .g-company {
      flex: 1.5;
      text-align: center;

      .bg {
        width: 50px;
        height: 50px;
        background: #fff;
        margin: 0 auto;

        img {
          width: 34px;
          margin: 3.5px 0;
        }
      }

      p {
        font-size: 12px;
        color: #A0A0A0;
        margin-bottom: 0;
      }
    }

    .g-contact {
      flex: 2;
      font-size: 12px;
      color: #A0A0A0;

      p {
        margin: 8px 0;
      }
    }
  }
  @media screen and (max-width: 1098px) {
    .footer-info {
      width: 979px;
    }
  }
  .icp {
    background: #1B1B1B;
    font-size: 14px;
    color: #909090;
    text-align: center;
    line-height: 50px;
  }
</style>
