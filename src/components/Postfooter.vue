<template>
  <div>
    <div class="footer">
      <div class="comment-input">发布评论</div>
      <div class="icons">
        <span class="iconfont iconpinglun-"></span>
        <i>{{post.comment_length>100?'99+':post.comment_length}}</i>
      </div>
      <div class="icons" @click="handerstar">
        <span class="iconfont iconshoucang" :class="post.has_star ? 'active':''"></span>
      </div>
      <div class="icons">
        <span class="iconfont iconfenxiang"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  methods: {
    // 收藏文章
    handerstar() {
      const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};

      this.$axios({
        url: "/post_star/" + this.post.id,
        headers: {
          Authorization: token
        }
      }).then(res => {
        // console.log(res);
        this.post.has_star = !this.post.has_star;
        this.$toast.success(this.post.has_star ? "收藏成功" : "取消收藏");
      });
    }
  }
};
</script>

<style lang="less" scoped>
@px: 360/100vw;
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
    margin: 0 8 / @px;
    .iconfont {
      font-size: 24px;
    }
    i {
      position: absolute;
      top: -3px;
      right: 0;
      display: block;
      padding: 1px 2px;
      background: red;
      color: #fff;
      line-height: 1;
      border-radius: 50px;
      font-size: 14px;
    }
    .active {
      color: red;
    }
  }
}
</style>