<template>
  <div class="login">
    <div class="resgit">
      <div class="top"></div>
      <div class="icon iconfont iconicon-test"></div>
      <div class="banner">
          <img src="../assets/new.png" alt="">
      </div>
      <div class="user">
          <input type="text" placeholder="用户名/手机号码" autocomplete="off" >
          <input type="password" placeholder="密码"  autocomplete="off">
          <button>登陆</button>
      </div>
      <div class="end"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.login {
  .resgit {
    padding: 20 / 360 * 100vw;
    width: 360px;
    position: relative;
    background: #f2f2f2;
    .top {
      height: 25px;
      background: #757575;
    }
    .icon {
      font-size: 32px;
      position: relative;
      top: 15px;
      left: 15px;
    }
    .banner{
        text-align: center;
         margin: 50px auto;
    }
    .user{
        text-align: center;
         input,button{
             width: 88%;
             height: 50px;
             outline: none;
             display: block;
             border: none;
             border-bottom: 1px solid #757575;
             margin: 10px auto;
             background: inherit;
            
         }
         input::placeholder{
              font-size: 20px;
         }
         button{
             margin: 50px auto;
             font-size: 18px;
             color: #f8e4dd;
             border: none;
             border-radius: 25px;
             background: #cc3300;
         }
    }
    .end{
        margin-top: 170px;
        height: 30px;
       background: #000000;
    }
  }
}
</style>