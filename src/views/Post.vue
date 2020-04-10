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
    <Postfooter :post="post"></Postfooter>
  </div>
</template>

<script>
import moment from "moment";
import Postfooter from "@/components/Postfooter";
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
   components: {
    Postfooter
  },
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
         data.content = data.content.replace(
                /http:\/\/localhost:3000/ig, 
                this.$axios.defaults.baseURL
            )
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
</style>