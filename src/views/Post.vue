<template>
  <div>
    <div class="main">
      <div class="header">
        <div class="left">
          <span class="iconfont iconjiantou2" @click="$router.back()"></span>
          <span class="iconfont iconnew"></span>
        </div>
        <span
          class="follow"
          :class="post.has_follow?'':'active'"
          @click="handerfollow"
        >{{post.has_follow?'已关注':'关注'}}</span>
      </div>
      <h2 class="title">{{post.title}}</h2>
      <p
        class="author"
      >{{post.user.nickname}} {{moment(post.create_date).format("YYYY-MM-DD hh:mm:ss")}}</p>
      <div class="content" v-html="post.content"></div>
      <div class="actions">
        <div class="actions-item" @click="handerlike">
          <span class="iconfont icondianzan"></span>
          <i>{{post.like_length?post.like_length:"0"}}</i>
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
import moment from "moment";
import { log } from "util";
export default {
  data() {
    return {
      // 文章的详情
      post: {
        user: {}
      },
      moment,
      token: ""
    };
  },
  components: {},
  mounted() {
    // 解构本地的token
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
    this.token = token;
    // 如果有token有值就给头信息加上token
    const config = {
      url: "/post/" + this.$route.params.id
    };
    if (token) {
      config.headers = {
        Authorization: token
      };
    }
    this.$axios(config).then(res => {
      // console.log(res);
      const { data } = res.data;
      this.post = data;
    });
  },
  methods: {
    handerfollow() {
      let url = "";
      // 先判断是当前的状态是关注还是非关注
      if (this.post.has_follow) {
        url = "/user_unfollow/" + this.post.user.id;
      } else {
        url = "/user_follows/" + this.post.user.id;
      }
      this.$axios({
        url,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        // console.log(res);
        // 关注成功后，按钮的状态改变
        // console.log(this.post.user.id);
        // console.log(res);
        this.post.has_follow = !this.post.has_follow;
        if (this.post.has_follow) {
          this.$toast.success("关注成功");
        } else {
          this.$toast.success("取消关注成功");
        }
      });
    },
    //文章点赞
    handerlike() {
      this.$axios({
        url: "/post_like/" + this.post.id,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        // console.log(res);
        this.post.has_like = !this.post.has_like;
        if (this.post.has_like) {
          this.post.like_length += 1;
        } else {
          this.post.like_length -= 1;
        }

        this.$toast.success(res.data.message);
      });
    },
    // 收藏文章
    handerstar() {
      this.$axios({
        url: "/post_star/" + this.post.id,
        headers: {
          Authorization: this.token
        }
      }).then(res => {
        // console.log(res);
        this.post.has_star =!this.post.has_star;
        this.$toast.success( this.post.has_star?"收藏成功":"取消收藏")
      });
    }
  }
};
</script>

<style lang="less" scoped>
@px: 360/100vw;
.main {
  padding: 20 / @px;
  padding-bottom: 100 / @px;
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
    .active {
      background: red;
      border: 1px solid red;
      color: #fff;
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
    /deep/img {
      width: 100%;
    }
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
    margin: 0 8 / @px;
    .iconfont {
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
    .active {
      color: red;
    }
  }
}
</style>