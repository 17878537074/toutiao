<template>
  <div>
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <div class="search-wraper">
        <span class="inconfont iconsearch"></span>
        <input
          type="text"
          placeholder="请输入搜索关键字"
          autofocus
          v-model="value"
          @keyup.enter="handerSearch"
        />
      </div>
      <span @click="handerSearch">搜索</span>
    </div>
    <div class="history">
      <div class="title">
        <strong>历史记录</strong>
        <span class="inconfont iconicon-test" @click="handerClear"></span>
      </div>
      <div class="hitory-list">
        <span
          class="item"
          v-for="(item,inedx) in histories"
          :key="inedx"
          @click="handerRecord(item)"
        >{{item}}</span>
      </div>
    </div>
    <div class="result-layer" v-if="showLayer">
      <div v-for="(item,index) in list" :key="index">
        <PostItem
          v-if="item.type==1 && item.cover.length > 0 && item.cover.length < 3"
          :data="item"
        ></PostItem>
        <PostImages v-if="item.type==1&&item.cover.length >= 3" :data="item"></PostImages>
        <PostVideo v-if="item.type==2" :data="item"></PostVideo>
      </div>
      <div class="empty" v-if="list.length===0">没有找到你想要的内容~</div>
    </div>
  </div>
</template>

<script>
import { log } from "util";
import PostItem from "@/components/PostItem";
import PostImages from "@/components/PostImages";
import PostVideo from "@/components/PostVideo";
export default {
  name: "search",
  components: {
    PostItem,
    PostImages,
    PostVideo
  },
  data() {
    return {
      // 双向数据绑定输入框的值
      value: "",
      histories: JSON.parse(localStorage.getItem("histories")) || [],
      list: [],
      showLayer: false
    };
  },
  methods: {
    handerSearch() {
      // console.log(this.value);
      if (this.value == "") return;
      //先获取本地的搜索记录，如果没有就是等于一个空数组；
      // this.histories = JSON.parse(localStorage.getItem("histories")) || [];
      // 把关键字添加到本地
      this.histories.unshift(this.value);
      // console.log(histories);
      // 数组去重
      this.histories = [...new Set(this.histories)];

      localStorage.setItem("histories", JSON.stringify(this.histories));
      // this.value = "";
      this.getList();
    },
    handerClear() {
      this.histories = [];
      localStorage.removeItem("histories");
    },
    // 点击历史栏列表的选项
    handerRecord(item) {
      this.value = item;
      // this.getList;
      this.getList();
    },
    getList() {
      this.$axios({
        url: "/post_search",
        params: {
          keyword: this.value
        }
      }).then(res => {
        // console.log(res);
        // 是否展示浮层
        this.showLayer = true;
        // 把历史记录数据结构出来
        const { data } = res.data;
        this.list = data;
        // console.log(this.list);
      });
    },
   
  },
   beforeRouteEnter(to, from, next) {
      // console.log(from);
     
      next(vm=>{
 if(from.path==="/"){
           vm.showLayer=false;
           vm.value=""
      }
      });
    },
  watch: {
    //  监听输入框的输入，如果值为空，清空文章列表并且隐藏文章列表
    value() {
      if (this.value === "") {
        this.list = [];
        this.showLayer = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@px: 360/100vw;
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.header {
  padding: 10 / @px 12 / @px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .search-wraper {
    flex: 1;
    margin: 0 20 / @px;
    border: 1px #ccc solid;
    height: 38 / @px;
    padding: 0 20 / @px;
    display: flex;
    align-items: center;
    line-height: 0;
    border-radius: 50px;
    input {
      border: none;
      background: none;
    }
    input::placeholder {
      text-indent: 5px;
    }
  }
}
.history {
  margin-top: 20 / @px;
  .title {
    padding: 0 20 / @px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // .iconicon-test {
    //   padding: 1px;
    //   border: 1px solid red;
    //   border-radius: 50px;
    // }
  }
  .hitory-list {
    padding: 0 10 / @px;
    margin-top: 5px;
    display: flex;
    flex-wrap: wrap;
    .item {
      padding: 5px 10 / @px;
      border: 1px solid #ccc;
      font-size: 14px;
      margin: 5 / @px 10 / @px;
    }
  }
}
.result-layer {
  // padding: 20 / @px;
  position: absolute;
  top: 54 / @px;
  left: 0;
  bottom: 0;
  width: 100%;
  background: white;
  overflow-y: auto;
  .result-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10 / @px 0;
    border-bottom: 1px solid #eee;
    p {
      flex: 1;
      margin-right: 10 / @px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span {
      color: #999;
    }
  }
}
.empty {
  text-align: center;
  color: #999;
  line-height: 50px;
}
</style>