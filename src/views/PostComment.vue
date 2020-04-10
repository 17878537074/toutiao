<template>
  <div>
    <Navigatebar title="精彩跟帖" :showHome="true"></Navigatebar>
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
  </div>
</template>

<script>
import Navigatebar from "@/components/Navigatebar";
import commentFloor from "@/components/commentFloor";
// 日期转换的库
import moment from "moment"
moment.locale("zh-CN");

export default {
  data() {
    return {
      pid:"",
      list:[],
      moment
    };
  },
  components: {
    Navigatebar,
    commentFloor
  },
  mounted() {
    const{id} = this.$route.params;
    this.pid = id;
    // console.log(id);
    this.getist();
  },
  methods: {
    getist() {
      this.$axios({
        url: `/post_comment/${this.pid}`
      }).then(res => {
        console.log(res);
        const {data} =res.data;
       
        this.list=data;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@px: 360/100vw;
.comment {
  padding: 15 / @px;
  border-bottom: 1px solid #eee;
  .content {
    margin-top: 10 / @px;
  }
}
.comment-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20 / @px;
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
</style>