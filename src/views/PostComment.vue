<template>
  <div>
    <Navigatebar title="精彩跟帖" :showHome="true"></Navigatebar>
    <div class="comment">
      <div class="comment-top">
        <div class="user">
          <img src="../assets/hua.jpg" alt />
          <div class="user-info">
            <p>火星少年</p>
            <span>45分钟前</span>
          </div>
        </div>
        <span class="reply">回复</span>
      </div>
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
        <div class="comment-floor">
          <div class="floor-top">
            <div class="user">
              <i>2.</i>
              <em>火星网友</em>
              <span>15分钟前</span>
            </div>
            <span>回复</span>
          </div>
          <div class="content">文章评论的回复</div>
          <div class="comment-floor">
            <div class="floor-top">
              <div class="user">
                <i>3.</i>
                <em>火星网友</em>
                <span>15分钟前</span>
              </div>
              <span>回复</span>
            </div>
            <div class="content">文章评论的回复</div>
          </div>
        </div>
      </div>
      <div class="content">文章说得很有道理</div>
    </div>
  </div>
</template>

<script>
import Navigatebar from "@/components/Navigatebar";

export default {
  components: {
    Navigatebar
  }
};
</script>

<style lang="less" scoped>
@px: 360/100vw;
.comment {
  padding: 15/ @px;
  border-bottom: 1px solid #ddd;
  .content {
    margin-top: 10 / @px;
  }
}
.comment-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10 / @px;
  .user {
    display: flex;
    align-items: center;
    img {
      display: block;
      width: 35 / @px;
      height: 35 / @px;
      border-radius: 50px;
      margin-right: 5px;
    }
    span {
      color: #999;
      font-size: 12px;
    }
  }
  .reply {
    font-size: 12px;
  }
}
.comment-floor {
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