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
    <!-- <div class="form"> -->
    <!-- 用vant ui插件进行开发 -->
    <!-- <div class="form-item">
        <input type="text" placeholder="用户名/手机号码" v-model="form.username" />
      </div>
      <div class="form-item">
        <input type="password" placeholder="密码" v-model="form.password" />
      </div>
      <div class="form-item">
        <button @click="login">登录</button>
    </div>-->
    <!-- 使用vant的表单 -->
    <!-- van-form是表单的组件， @submit是表单按钮提交的事件 -->
    <van-form @submit="onSubmit" class="form">
      <!-- van-field是表单的字段 -->
      <!-- rules是表单字段的规则，required表示这个输入框是必填 -->
      <van-field
        v-model="form.username"
        name="手机号码"
        placeholder="手机号码"
        :rules="[{ required: true, message: '请填写手机号码' }]"
      />
      <!-- 密码输入框，和上面的属性是一样的 -->
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div>
        <!-- 如果这个按钮是在van-form组件内部，
        并且按钮的native-type="submit"，说明点击这个按钮就会触发submit事件-->
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <router-link to="/register">
      <van-button round block class="link-resgiter">注册</van-button>
    </router-link>
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
    /*  login() {
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
    }, */
    // 提交表单时候触发的事件，该事件通过校验才会触发
    // values是表单返回的值，这里的values我们用不上，数据可以在this.form里面拿
    onSubmit(values) {
      // console.log("submit", this.form);
      // 调用axios发起异步请求，类似$.ajax(类似不代表一样)
      this.$axios({
        // 接口地址
        // url: "http://hmtoutiao-api.atlansic.com/login",
        url: "/login",
        // 声明请求的方法为post请求(一定要注册这个method没有s)
        // 跟vue的methods属性毫无关系
        method: "POST",
        // 参数
        data: this.form
        // .then方法里面的函数就是成功的回调函数,axios没有succces
      }).then(res => {
        // 获取到返回的信息
        const { message, data } = res.data;
        // 使用vant的弹窗提示用，success表示成功的弹窗
        this.$toast.success(message);
        // 将用户信息存到本地存储
        localStorage.setItem("userInfo", JSON.stringify(data));
        // 判断地址栏有没有带query_url这个属性，有的话跳回这个属性下的路径，没有就跳回个人中心
        const { return_url } = this.$route.query;
        // console.log(return_url);

        this.$router.replace(return_url || "/personal");
      });
    }
  }
};
</script>

<style lang="less"scoped >
// scoped让样式只能对当前组件有作用

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
  /*   .form-item input {
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
  } */
  .form {
    .van-cell {
      padding: 10px 0;
      font-size: 16px;
      margin-bottom: 20 / 360 * 100vw;
    }
    .van-cell:not(:last-child)::after {
      border-bottom: 1px solid #333;
      left: 0;
    }
    .van-button--info {
      margin-top: 50 / 360 * 100vw;
      background-color: #cc3300;
      border: 1px solid #cc3300;
    }
  }
  .link-resgiter {
    margin-top: 50 / 360 * 100vw;
  }
}
</style>