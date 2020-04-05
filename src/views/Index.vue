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
    <!-- v-model：就是当前的索引值，是唯一的，比较类似于for循环的key -->
    <!-- sticky：是否使用粘性定位布局 -->
    <!-- swipeable: 是否开启手势滑动切换 -->
    <van-tabs v-model="active" sticky swipeable @scroll="handelScroll">
      <van-tab v-for="(item,index) in categories" :key="index" :title="item.name">
        <!-- 下拉刷新 -->

        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <!-- van的列表组件 -->
          <!-- @load 滚动到底部时候触发的函数 -->
          <!-- immediate-check关闭list加载后触发一次 load 事件 -->
          <van-list
            :immediate-check="false"
            v-model="item.loading"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div v-for="(item,index) in categories[active].posts" :key="index">
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
      categories: [],
      // list: [],
      active: 0,
      // loading: false,
      // finished: false,
      refreshing: false,
      // categoryId: 999
      token: ""
    };
  },
  // 监听属性

  watch: {
    // 监听tab栏的切换

    active() {
      //  console.log(this.active);
      // 判断如果点击的是最后一个图标，跳转到栏目管理页

      if (this.active === this.categories.length - 1) {
        // console.log(111);
        this.$router.push("/category");
      }

      // 当栏目切换的时候，重新 请求当前页面的数据
      this.getList();
      setTimeout(() => {
        // 页面滚动到当前栏目下的scrollY值
        window.scrollTo(0, this.categories[this.active].scrollY);
      }, 0);
    }
  },
  mounted() {
    // 请求前先判断本地是否有栏目的数据
    const categories = JSON.parse(localStorage.getItem("categories"));
    // 获取本地的token,如果没有值就等于一个空对象

    const { token } = JSON.parse(localStorage.getItem("userInfo")) || {};
    // 把token保存到data
    this.token = token;
    if (categories) {
      // 如果当前是登录的状态，但是栏目的第一项居然不是“关注”，需要重新请求
      // 如果当前未登录，但是栏目的第一项居然叫“关注”，也需要重新请求
      if (categories && categories[0].name !== "关注" && token) {
        // 调用请求栏目的数据,并且保存到本地

        this.getcategories(token);
        return;
        // this.categories = categories;
      }
      if (categories && !token && categories[0].name === "关注") {
        this.getcategories();
        return;
      }
      // 调用方法给每个栏目添加新属性

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
        pageIndex: 1,
        pageSize: 5,
        category: this.categories[this.active].id
      }
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      // this.list = data;
      this.categories[this.active].posts = data;
      // console.log(this.categories);
      this.categories = [...this.categories];
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
        v.posts = [];
        v.scrollY = 0; // 给每个栏目添加一个滚动条的高度
        v.finished = false;
        v.loading = false;
        v.isload = false;//当前栏
        return v;
      });
      // console.log(this.categories);
      // 请求文章列表数据,是一定要放到栏目处理之后执行；
      this.getList();
    },
    // 请求获取菜单栏目数据

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
    getList() {
      if (this.categories[this.active].finished) {
        return;
      }
      // 当前栏目的id,pageIndex,finished
      const { pageIndex, id, name } = this.categories[this.active];
      // console.log(id);
      // 请求文章的配置
      const configs = {
        url: "/post",
        params: {
          pageIndex, // 每个栏目页数是不一样的
          pageSize: 5, //  请求数据的条数
          category: id
        }
      };
      // 判断当前栏目是否是关注栏目
      if (name === "关注") {
        // 如果是的话就需要加上token

        configs.headers = {
          Authorization: this.token
        };
      }
      // 请求文章列表

      this.$axios(configs).then(res => {
        // console.log(res);
        const { data, total } = res.data;
        // 把data新数组和当前栏目的文章列表合并

        this.categories[this.active].posts = [
          ...this.categories[this.active].posts,
          ...data
        ];
        // 用赋值的方式触发页面刷新
        this.categories = [...this.categories];
        // 告诉组件当前的请求加载完毕
        this.categories[this.active].loading = false;
        // this.finished = true;
        // 如果当前文章的条数等于total总条数，说明数据已经加载完毕
        if (this.categories[this.active].posts.length == total) {
          this.categories[this.active].finished = true;
          this.categories = [...this.categories];
        }
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
      this.categories[this.active].pageIndex += 1;
      this.getList();
    },

    // 监听tab滚动的事件
    handelScroll(data) {
      // console.log(data);

      // 因为栏目不管是从本地获取或者请求接口也好，都是需要时间，
      // 所以需要等this.categories有值时候才设置滚动条的高度s
      if (this.categories.length === 0) return;
      // scrollTop是滚动条的距离
      const { scrollTop } = data;
      // 把滚动条的高度赋值给当前栏目下的scrollY
      this.categories[this.active].scrollY = scrollTop;
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