<template>
  <div>
    <!-- 头部组件 -->
    <Navigatebar title="我的关注"></Navigatebar>
    <div class="item-user" v-for="(item,index) in follow" :key="index">
      <img :src="$axios.defaults.baseURL+item.head_img" alt />
      <div class="user-info">
        <div>{{item.nickname}}</div>
        <p>{{moment(item.create_date).format("YYYY-MM-DD hh:mm:ss")}}</p>
      </div>
      <span class="cencel">取消关注</span>
    </div>
  </div>
</template>

<script>
import Navigatebar from "@/components/Navigatebar";
import moment from "moment";
export default {
  data() {
    return {
      userInfo: "",
      follow:[],
      moment
    };
  },
  components: {
    Navigatebar
  },
  mounted() {
    //   用户关注接口
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userInfo = userInfo;
    this.$axios({
      url: "/user_follows",
      method:"get",
       headers: {
        Authorization: this.userInfo.token
      },
    }).then(res=>{
           console.log(res);
        const {data} =res.data;
           this.follow = data;
    });
  }
};
</script>

<style lang="less" scoped>
@px: 360/100vw;
.item-user {
  padding: 20 / @px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  align-items: center;
  img {
    width: 40 / @px;
    height: 40 / @px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20 / @px;
  }
  .user-info {
    flex: 1;
    margin-right: 20 / @px;
    p {
      font-size: 14px;
      color: #999;
    }
  }
  .cencel {
    padding: 5px 15px;
    font-size: 12px;
    background: #eee;
    border-radius: 50px;
  }
}
</style>