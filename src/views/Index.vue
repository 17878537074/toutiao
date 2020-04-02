<template>
  <div>
    <div class="header">
      <span class="iconfont iconnew"></span>

      <router-link to="#" class="search">
        <span class="inconfont iconsearch"></span>
        <i>搜索新闻</i>
      </router-link>
      <router-link to="/personal">
        <span class="iconfont iconwode"></span>
      </router-link>
    </div>
    <!-- Tab栏 -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab v-for="(item,index) in categories" :key="index" :title="item.name">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            :immediate-check="false"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div v-for="(item,index) in list" :key="index">
              <PostItem
                v-if="item.type==1 && item.cover.length > 0 && item.cover.length < 3"
                :data="item"
              ></PostItem>
              <PostImages v-if="item.type==1&&item.cover.length >= 3" :data="item"></PostImages>
              <PostVideo v-if="item.type==2" :data="item"></PostVideo>
            </div>
          </van-list>
        </van-pull-refresh>
        <!-- <PostImages></PostImages>
        <PostVideo></PostVideo>-->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { log } from "util";
import PostItem from "@/components/PostItem";
import PostImages from "@/components/PostImages";
import PostVideo from "@/components/PostVideo";
export default {
  data() {
    return {
      categories: [
        "关注",
        "娱乐",
        "体育",
        "汽车",
        "新闻",
        "房产",
        "明星",
        "模特",
        "V"
      ],
      list: [],
      active: 0,
      loading: false,
      finished: false,
      refreshing: false,
      categoryId: 999
    };
  },
  watch: {
    active() {
      //  console.log(this.active);
      if (this.active === this.categories.length - 1) {
        // console.log(111);
        this.$router.push("/栏目管理");
      }
    }
  },
  mounted() {
    // 请求前先判断本地是否有栏目的数据
    const categories = JSON.parse(localStorage.getItem("categories"));
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
    if (categories) {
      if (categories && categories[0].name !== "关注" && token) {
        this.getcategories(token);
        return;
        // this.categories = categories;
      }
      if (categories && !token && categories[0].name === "关注") {
        this.getcategories();
        return;
      }
      this.categories = categories;
      this.handercategories();
    } else {
      this.getcategories(token);
    }
    // 页面一开始就请求头条的数据
    this.$axios({
      url: "/post",
      params: {
        // pageIndex:this.categories[this.active].pageIndex,
        pageSize: 5,
        category: this.categoryId
      }
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      this.list = data;
      // console.log( this.list);
    });
  },
  components: {
    PostItem,
    PostImages,
    PostVideo,
    refreshing: false
  },
  methods: {
    handercategories() {
      this.categories = this.categories.map(v => {
        v.pageIndex = 1;
        return v;
      });
      // console.log(this.categories);
    },
    getcategories(token) {
      const config = {
        url: "/category"
      };
      if (token) {
        config.headers = {
          Authorization: token
        };
      }
      this.$axios(config).then(res => {
        // console.log(res);

        const { data } = res.data;
        data.push({
          name: "V"
        });
        this.categories = data;
        localStorage.setItem("categories", JSON.stringify(data));
        this.handercategories();
      });
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
      this.$axios({
        url: "/post",
        params: {
          pageIndex: this.categories[this.active].pageIndex + 1,
          pageSize: 5,
          category: this.categoryId
        }
      }).then(res => {
        // console.log(res);
        const { data, total } = res.data;
        this.list=[...this.list,...data]
        this.finished = true;
        this.loading = false;
        // if(this.list.length==total){
        // this.finished = true;
        // }
      });
    },
    onRefresh() {
      // 表示加载完毕
      this.refreshing = false;
      console.log("正在下拉刷新");
    }
  }
};
</script>

<style lang="less" scoped>
@px: 360/100vw;
.header {
  height: 50 / @px;
  background: #ff0000;
  display: flex;
  padding: 0 20 / @px;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  .search {
    flex: 1;
    height: 32 / @px;
    margin: 0 50 / @px;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    font-size: 14px;
    line-height: 1;
    vertical-align: middle;
    span {
      margin-right: 5px;
    }
  }
  .iconnew {
    font-size: 20px;
    transform: scale(3);
    position: relative;
    left: 20 / @px;
  }
  .iconwode {
    font-size: 20px;
  }
}
/deep/ .van-tabs__nav {
  background: #eee;
  position: static;
}
/deep/ .van-tab {
  flex-basis: 15% !important;
}
/deep/ .van-tab:nth-last-child(2) {
  background: #eee;
  width: 25px !important;
  position: absolute;
  right: 0;
  top: 0;
}
/deep/ .van-tabs__wrap {
  padding-right: 20 / @px;
}
/deep/ .van-tabs__line {
  display: none;
}
/deep/ .van-tab--active {
  border-bottom: 1px solid red;
}
</style>