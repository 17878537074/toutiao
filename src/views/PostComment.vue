<template>
  <div class="container">
    <Navigatebar title="精彩跟帖" :showHome="true"></Navigatebar>
    <!-- v-model是否正在加载中 finished是否加载完毕 @load滚动到底部加载的事件-->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <div class="comment" v-for="(item,index) in list" :key="index">
        <div class="comment-top">
          <div class="user">
            <img :src="$axios.defaults.baseURL + item.user.head_img" alt />
            <div class="user-info">
              <p>{{item.user.nickname}}</p>
              <span>{{moment(item.create_date).fromNow()}}</span>
            </div>
          </div>
          <span class="reply">回复</span>
        </div>
        <!-- 回复组件 -->
        <commentFloor v-if="item.parent" :data="item.parent"></commentFloor>
        <div class="content">{{item.content}}</div>
      </div>
    </van-list>
    <div class="publish">
      <!-- 输入框点击和不点击的效果不一样 -->
      <van-field
        v-model="message"
        :rows="rows"
        :autosize="!isFcous"
        type="textarea"
        placeholder="说点什么..."
        class="textarea"
        @focus="handerFocus"
        @blur="handerBlur"
        @keyup.enter="handerSubmit"
        :class="isFcous?`active`:``"
      />
      <span class="submit" v-if="isFcous" @click="handerSubmit">发布</span>
    </div>
  </div>
</template>

<script>
import Navigatebar from "@/components/Navigatebar";
import commentFloor from "@/components/commentFloor";
// 日期转换的库
import moment from "moment";
import { log } from "util";
moment.locale("zh-CN");

export default {
  data() {
    return {
      pid: "",
      list: [],
      moment,
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 5,
      message: "",
      rows: 1,
      isFcous: false
    };
  },
  components: {
    Navigatebar,
    commentFloor
  },
  mounted() {
    const { id } = this.$route.params;
    this.pid = id;
    // console.log(id);
    this.getist();
  },
  methods: {
    getist() {
      this.$axios({
        url: `/post_comment/${this.pid}`,
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(res => {
        // console.log(res);
        const { data } = res.data;
        this.list = [...this.list, ...data];
        this.pageIndex += 1;
        this.loading = false;
        if (data.length < this.pageSize) {
          this.finished = true;
        }
      });
    },
    onLoad() {
      // console.log(11);
      this.getist();
    },
    // 评论框获得焦点时触发的事件
    handerFocus() {
      // console.log(111);
      this.rows = 3;
      this.isFcous = true;
    },
    handerBlur() {
      // console.log(11);
      this.rows = 1;
      setTimeout(() => {
        this.isFcous = false;
      }, 200);
    },
    // 发布评论
    handerSubmit() {
      if (this.message === "") {
        this.$toast("评论不能为空！！！");
        return;
      }
      const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
      //  console.log(this.message);
      this.$axios({
        url: "/post_comment/" + this.pid,
        method: "POST",
        headers: {
          Authorization: token
        },
        data: {
          content: this.message
        }
      }).then(res => {
        // console.log(res);
        (this.message = "");
        this.$toast.success("发布成功");
        // this.pageIndex=1;
        // this.getist();
        this.list=[];//必须要清空，如果不清空会合并之前的评论
        this.pageIndex=1;
        this.getist()
      });
    }
  }
};
</script>

<style lang="less" scoped>
@px: 360/100vw;
.container {
  padding-bottom: 60 / @px;
}
.comment {
  padding: 20 / @px 15 / @px;
  border-bottom: 1px solid #eee;
  .content {
    margin-top: 10 / @px;
  }
}
.comment-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20 / @px;
  padding: 10 / @px 5px;
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
.publish {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  padding: 5px 15 / @px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .textarea {
    background: #eee;
    border-radius: 50px;
    padding: 5px 10 / @px;
  }
  .active {
    height: 82 / @px!important;
    border-radius: 4px;
  }
  .submit {
    margin-left: 5px;
    padding: 3px 10 / @px;
    color: #fff;
    background: red;
    font-size: 12px;
    border-radius: 50px;
    flex-shrink: 0;
  }
}
</style>