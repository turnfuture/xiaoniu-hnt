<template>
  <div class="wrapper">
    <!-- 头部-banner -->
    <lsl-header :url="6"></lsl-header>
    <lsl-banner :imgs="banner"></lsl-banner>

    <div class="container" :class="$style.content">
      <!-- 左侧导航栏 -->
      <lsl-aside
        :aside-list="asides"
        @bind-current="parentListen"
        >
        <h2>Contact Us</h2>
        <p>联系我们</p>
      </lsl-aside>

      <div :class="$style['pro-right']">
        <div :class="$style['com-content']">
          <template v-if="current === 0">
            <div :class="$style['title']">
              <h4>联系我们</h4>
              <p>Contact us</p>
            </div>
            <lsl-amap></lsl-amap>
            <div class="company">
              <h2>安徽鹤年堂中药饮片有限公司</h2>
              <p>地址：安徽省亳州市经济开发区百合路888号</p>
              <p>电话：0558-5809888</p>
            </div>
          </template>
          <template v-else>
            <div :class="$style['title']">
              <h4>在线留言</h4>
              <p>Online message</p>
            </div>
            <form :class="$style['form']">
              <ul>
                <li>
                  <el-input :class="$style['el-input']" type="text" placeholder="请输入名字" v-model="subFormData.name"></el-input>
                  <el-input :class="$style['el-input']" type="text" placeholder="请输入手机号或邮箱" v-model="subFormData.mail"></el-input>
                </li>
                <li>
                  <el-input type="textarea" placeholder="请输入留言内容" v-model="subFormData.content"></el-input>
                </li>
                <li>
                  <el-button type="primary" @click="bindSub">提交</el-button>
                </li>
              </ul>
            </form>
          </template>
        </div>
      </div>
    </div>
    <lsl-footer></lsl-footer>
  </div>
</template>

<script>
export default {
  name: 'contact',
  data() {
    return {
      banner: require('../assets/img/contact.png'),
      asides: [{
        title: '联系我们',
      }, {
        title: '在线留言',
      }],
      current: 0,
      subFormData: {
        name: '',
        mail: '',
        content: ''
      }
    }
  },
  methods: {
    parentListen(index) {
      this.current = index;
    },
    bindSub() {
      const subFormData = this.subFormData;
      if (subFormData.name === "" || subFormData.mail === "" || subFormData.content === "") {
        this.$message({
          message: subFormData.name === "" ? '名字不能为空' : subFormData.mail === "" ? '手机号或邮箱不能为空' : '留言内容不能为空',
          type: 'warning'
        });
        return false;
      }
      this.$dataPost('/api/cms/message/add',
        this.subFormData,
      (res) => {
        if (res.code === 0) {
          this.$message({
            message: '留言成功',
            type: 'success'
          });
          this.subFormData.name = '';
          this.subFormData.mail = '';
          this.subFormData.content = '';
        }
      })
    }
  }
}
</script>

<style lang="scss" module>
  $m20: 20px;
  $m15: 12px;
  $color: #D2393D;
  .content {
    display: flex;

    .pro-right {
      flex: 1;
      padding: 40px 0 40px $m20;

      .title {
        text-align: center;
        margin: 20px 0 40px;

        h4 {
          font-size: 32px;
          color: $color;
          margin: 0;
        }

        p {
          color: $color;
          margin: 8px 0 0;
        }
      }

      .company h2 {
        font-weight: normal;
        margin-bottom: 40px;
      }

      .form {
        ul li {
          display: flex;
          margin-bottom: 30px;

          .el-input {
            flex: 1;
            margin-right: 20px;

            &:nth-child(2n) {
              margin-right: 0;
            }
          }

          textarea {
            height: 160px;
          }

          button {
            background: $color;
            border: 0;
          }
        }
      }
    }
  }
</style>
