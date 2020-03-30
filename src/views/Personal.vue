<template>
  <!-- <div>个人中心</div> -->

  <!-- 头部 -->
  <div class="container">
   <Navigatebar title="个人中心" :showHome="true"></Navigatebar>
    <router-link to="/edit-profile">
      <div class="header">
        <div class="avatar">
          <img :src="$axios.defaults.baseURL+userInfo.head_img" alt />
          <!-- <img src="../assets/hua.jpg" alt=""> -->
        </div>
        <!-- 姓名 -->
        <div class="profile">
          <div>
            <span class="inconfont iconxingbienan" v-if="userInfo.gender===1"></span>
            <span class="inconfont iconxingbienv" v-if="userInfo.gender===0"></span>
            {{userInfo.nickname}}
          </div>
          <p>{{moment(userInfo.create_date).format('YYYY-MM-DD')}}</p>
        </div>
        <!-- 右箭头的箭头图标 -->
        <span class="iconfont arrow iconjiantou1"></span>
      </div>
    </router-link>
    <!-- 用户列表 -->
    <!-- <div class="listbar"> -->
    <!-- <router-link to="#"> -->
    <!-- 左边用户功能 -->
    <!-- <div>我的关注</div> -->
    <!-- <div class="tips"> -->
    <!-- 关注的用户 -->
    <!-- <span class="iconfont iconjiantou1"></span> -->
    <!-- </div> -->
    <!-- </router-link> -->
    <!-- </div> -->
    <Listbar v-for="(item,index) in rows" :key="index" :lable="item.lable" :tips="item.tips" :path="item.path"></Listbar>
    <Listbar lable="退出" @click.native="handlerClick"></Listbar>
  </div>
</template>

<script>
import Listbar from "@/components/Listbar";
import moment from "moment";
import Navigatebar from "@/components/Navigatebar"
export default {
  data() {
    return {
      rows: [
        {
          lable: "我的关注",
          tips: "关注的用户",
          path:"/follow"
        },
        {
          lable: "我的跟帖",
          tips: "跟帖回复",
          path:"/comments"
        },
        {
          lable: "我的收藏",
          tips: "文章视频",
          path:"/star"
        }
      ],
      userInfo: {},
      moment
    };
  },
  components: {
    Listbar,
    Navigatebar
  },
  mounted() {
    const jsonstr = localStorage.getItem("userInfo");
    const userjson = JSON.parse(jsonstr);
    const userInfo = userjson;
    this.$axios({
      url: "/user/" + userjson.user.id,
      headers: {
        Authorization: userjson.token
      }
    }).then(res => {
      //   console.log(res);
      const { data } = res.data;
      this.userInfo = data;
    });
  },
  methods: {
    handlerClick() {
      //   console.log(111);
      this.$dialog
        .confirm({
          title: "退出",
          message: "确认退出"
        })
        .then(() => {
          // on confirm  点击确认按钮触发的事件
          localStorage.removeItem("userInfo");
          this.$router.replace("/login");
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang="less" scoped>
@px: 360/100vw;
.container {

  .header {
    padding: 20 / @px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 5px solid #eee;
    .avatar {
      img {
        display: block;
        width: 70 / @px;
        height: 70 / @px;
        border-radius: 50%;
        background: skyblue;
        object-fit: contain;
      }
    }
    .profile {
      flex: 1;
      padding: 20 / @px;
      line-height: 1.5;
      p {
        color: #999;
      }
      .iconxingbienan {
        color: skyblue;
      }
      .iconxingbienv {
        color: pink;
      }
    }
  }
}
// 列表按钮栏的样式
// .listbar {
//   padding-left: 20 / @px;
//   height: 48 / @px;
//   line-height: 48/@px;
//   a {
//     display: flex;
//     justify-content: space-between;
//     border-bottom: 1px solid #eeeeee;
//   }
//   .tips{
//       color: #999;
//       span{
//           margin-left: 5px;
//       }
//   }
// }
</style>