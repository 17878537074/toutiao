<template>
  <div class="container">
    <!-- 关闭按钮 -->
    <div class="end-btn">
      <span class="iconfont iconicon-test"></span>
    </div>
    <!-- LOGO -->
    <div class="logo">
      <span class="iconfont iconnew"></span>
    </div>

    <!-- 表单样式 -->
    <div class="form">
      <!-- 用vant ui插件进行开发 -->
      <div class="form-item">
        <input type="text" placeholder="用户名/手机号码" v-model="form.username" />
      </div>
      <div class="form-item">
        <input type="password" placeholder="密码" v-model="form.password" />
      </div>
      <div class="form-item">
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      // this.$toast("登录成功");
      //   调用axios发起异步请求，类似$ajax
      this.$axios({
        url: "http://hmtoutiao-api.atlansic.com/login",
        method: "post",
        data: this.form
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$toast(message);
        } else {
          this.$toast(message);
        }
      });
    }
  }
};
</script>

<style lang="less">
@px: 360/100vw;
.container {
  width: 360px;
  padding: 20 / @px;
  .end-btn {
    font-size: 27 / @px;
    line-height: 0;
  }

  .logo {
    text-align: center;
    span {
      font-size: 126 / @px;
      color: #cc3300;
    }
  }
  .form-item input {
    width: 100%;
    height: 44 / @px;
    line-height: 44 / @px;
    background: none;
    border: none;
    outline: none;
    border-bottom: 1px solid #999;
    font-size: 16px;
  }
  .form-item button {
    width: 100%;
    height: 48 / @px;
    background: #cc3300;
    border-radius: 24 / @px;
    outline: none;
    border: none;
    color: #fff;
    margin-top: 50 / @px;
  }
}
</style>