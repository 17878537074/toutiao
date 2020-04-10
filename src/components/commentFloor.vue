<template>
  <div>
    <div class="comment-floor">
      <div class="floor-top">
        <div class="user">
          <i>1.</i>
          <em>火星网友</em>
          <span>15分钟前</span>
        </div>
        <span>回复</span>
      </div>

      <div class="content">文章评论的回复</div>
    </div>
  </div>
</template>

<script>
export default {
    // 声明当前的组件名，在当前的组件里name的值可以用于调用组件自己
    name:"commentFloor"
};
</script>

<style lang="less" scoped>
@px:360/100vw;
.comment-floor {
    font-size: 13px;
  border: 1px solid #eee;
  padding: 2 / @px;
  margin-top: 10 / @px;
  .floor-top {
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 12px;
      color: #999;
      margin: 0 5px;
    }
    em {
      margin: 0 5px;
    }
  }
  .content {
    padding: 5px;
    padding-top: 0;
  }
}
</style>