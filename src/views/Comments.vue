<template>
  <div>
    <Navigatebar title="我的跟帖"></Navigatebar>
    <div class="comment-item" v-for="(item,index) in comments" :key="index">
      <div class="date">{{moment(item.create_date).format("YYYY-MM-DD hh:mm:ss")}}</div>
      <div class="parent" v-if="item.parent">
        回复:{{item.parent.user.nickname}}
        <div class="parent-content">{{item.parent.conent}}</div>
      </div>
      <div class="comment-conent">{{item.content}}</div>
      <router-link to="#" class="link-post">
        <div>原文：{{item.post.title}}</div>
        <span class="inconfont iconjiantou1"></span>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navigatebar from "@/components/Navigatebar";
import moment from "moment";

export default {
  data() {
    return {
      comments: [],
      moment
    };
  },
  components: {
    Navigatebar
  },
  mounted() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.$axios({
      url: "/user_comments",
      headers: {
        Authorization: userInfo.token
      }
    }).then(res => {
      //   console.log(res);
      const { data } = res.data;
      this.comments = data;
    });
  }
};
</script>

<style lang="less" scoped>
@px: 360/100vw;
.comment-item {
  padding: 20 / @px;
  border-bottom: 1px solid #eee;

  .date {
    color: #999;
    margin-bottom: 20 / @px;
  }
  .parent {
    padding: 10 / @px;
    background: #eee;
  }
  .comment-conent {
    margin: 20 / @px 0;
  }
  .link-post {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    div {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span {
     margin-left: 5px;
    }
  }
}
</style>