<template>
  <div>
    <div class="main">
      <div class="header">
        <div class="left">
          <span class="iconfont iconjiantou2"></span>
          <span class="iconfont iconnew"></span>
        </div>
        <span class="follow active">已关注</span>
      </div>
      <h2 class="title">车主注意啦！9月下旬部分临时泊车位进行清洁保养</h2>
      <p class="author">火星时报 2019-10-10</p>
      <div
        class="content"
      >为营造临时泊位“干静、整洁、平安、有序”面貌迎国庆，市交通部门拟在9月下旬对部分城市道路临时泊位进行清洁保养，请市民群众配合在清洁保养期间将车辆驶离泊位。第一阶段临时泊位清洁保养计划（涉及17条路段）：</div>
      <div class="actions">
        <div class="actions-item">
          <span class="iconfont icondianzan"></span>
          <i>122</i>
        </div>
        <div class="actions-item">
          <span class="iconfont iconweixin"></span>
          <i>微信</i>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="comment-input">发布评论</div>
      <div class="icons">
        <span class="iconfont iconpinglun-"></span>
        <i>112</i>
      </div>
      <div class="icons">
        <span class="iconfont iconshoucang active"></span>
      </div>
      <div class="icons">
        <span class="iconfont iconfenxiang"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@px: 360/100vw;
.main {
  padding: 20 / @px;
  border-bottom: 5px solid #eee;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20 / @px;
    .left {
      vertical-align: middle;
      display: flex;
      align-items: center;
      .iconnew {
        display: inline-block;
        margin-left: 30px;
        transform: scale(3.5);
      }
    }
    .follow {
      padding: 3px 10px;
      border: 1px solid #999;
      border-radius: 50px;
      font-size: 12px;
    }
  }
  .title {
    font-size: 18px;
  }
  .author {
    line-height: 1.8;
    color: #999;
    font-size: 14px;
  }
  .content {
    line-height: 1.8;
    margin-top: 15px;
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 30 / @px;
    .actions-item {
      display: flex;
      align-items: center;
      border: 1px solid #999;
      padding: 3px 10px;
      border-radius: 50px;
      font-size: 12px;
      span {
        margin-right: 5px;
      }
      .iconweixin {
        color: #00c800;
      }
    }
  }
}
.footer {
  padding: 10 / @px 20 / @px;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  .comment-input {
    flex: 1;
    height: 30 / @px;
    margin-right: 20 / @px;
    padding: 0 20 / @px;
    line-height: 30 / @px;
    background: #eee;
    border-radius: 50px;
  }
  .icons {
    position: relative;
    margin: 0 8/@px;
    .iconfont{
        font-size: 24px;
    }
    i {
      position: absolute;
      top: -7px;
      right: -14px;
      display: block;
      padding: 1px 2px;
      background: red;
      color: #fff;
      line-height: 1;
      border-radius: 50px;
      font-size: 14px;
    }
  }
}
</style>