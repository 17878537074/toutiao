<template>
  <div>
    <Navigatebar title="我的收藏"></Navigatebar>
    <div v-for="(item,index) in stars" :key="index">
      <!-- 少于三张图片的结构 -->
      <div class="star-itemm imgText" v-if="item.cover.length<3 && item.cover.length>0">
        <div class="imgText-left">
          <h4>{{item.title}}</h4>
          <p>{{item.user.nickname}} {{item.comments.length}}帖</p>
        </div>
        <img :src="$axios.defaults.baseURL+item.cover[0].url" alt />
      </div>
      <!-- 多于三张图片的结构 -->
      <!-- <div class="imgList">
        <h4>迪丽热巴时尚周刊</h4>
        <div class="images">
          <img src="../assets/hua.jpg" alt v-for="(item,index) in [1,2,3]" :key="index" />
        </div>
        <p>火星周报 52帖</p>
      </div> -->
    </div>
  </div>
</template>

<script>
import Navigatebar from "@/components/Navigatebar";

export default {
  data() {
    return {
      stars: []
    };
  },
  components: {
    Navigatebar
  },
  mounted() {
    //   我的收藏请求
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.$axios({
      url: "/user_star",
      headers: {
        Authorization: userInfo.token
      }
    }).then(res => {
      //   console.log(res);
      const { data } = res.data;
      this.stars = data;
    });
  }
};
</script>

<style lang="less" scoped>
@px: 360/100vw;
.imgText {
  padding: 20 / @px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .imgText-left {
    h4 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    p {
      color: #999;
      margin-top: 5px;
    }
  }
  img {
    width: 110 / @px;
    height: 75 / @px;
    object-fit: cover;
    margin-left: 20 / @px;
    flex-shrink: 0;
  }
}
.imgList {
  padding: 20 / @px;
  h4 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  p {
    color: #999;
    margin-top: 5px;
  }
  .images {
    margin: 10 / @px 0;
    display: flex;
    justify-content: space-between;
    img {
      width: 32%;
      height: 75 / @px;
      object-fit: cover;
    }
  }
}
</style>