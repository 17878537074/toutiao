<template>
  <div>
    <Navigatebar title="栏目管理"></Navigatebar>
    <div class="content">
      <p class="decs">点击删除以下频道</p>
      <div class="list">
        <span
          class="item"
          v-for="(item,index) in arrUp"
          :key="index"
          :class="['关注','头条'].includes(item.name)?'active':''"
          @click="handDel(item,index)"
        >{{item.name}}</span>
      </div>
      <p class="decs">点击添加以下频道</p>
      <div class="list">
        <span
          class="item"
          v-for="(item,index) in arrDown"
          :key="index"
          @click="handAdd(item,index)"
        >{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Navigatebar from "@/components/Navigatebar";
export default {
  components: {
    Navigatebar
  },
  data() {
    return {
      // 从本地获取的栏目数组
      categories: [],
      arrUp: [],
      arrDown: []
    };
  },
  //   组件加载完毕之后触发
  mounted() {
    const categories = JSON.parse(localStorage.getItem("categories"));
    this.categories = categories;
    this.arrUp = this.categories.filter(v => {
      return v.is_top === 1;
    });
    this.arrDown = this.categories.filter(v => {
      return v.is_top === 0;
    });
    // console.log(this.arrUp, this.arrDown);
  },
  //   页面销毁时候触发的事件

  methods: {
    //  点击删除栏目，上面的栏目的事件
    handDel(item, index) {
      // 把当前点击的这项从arrUP删除
      if (["关注", "头条"].includes(item.name)) return;
      this.arrUp.splice(index, 1);
      item.is_top = 0;
      this.arrDown.push(item);
    },
    //  点击添加栏目，上面的栏目的事件
    handAdd(item, index) {
      this.arrDown.splice(index, 1);
      item.is_top = 1;
      this.arrUp.push(item);
    }
  },
  destroyed() {
    this.categories = [
      ...this.arrUp,
      ...this.arrDown,
      this.categories[this.categories.length - 1]
    ];
    //    alert( this.categories);
    const str = JSON.stringify(this.categories);
    // 将数据保存到本地
    localStorage.setItem("categories", str);
  }
};
</script>

<style lang="less" scoped>
@px: 360/100vw;
.content {
  padding: 10 / @px;
  .decs {
    font-size: 14px;
    margin: 20 / @px 0;
  }
  .list {
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    .item {
      border: 1px solid #999;
      padding: 5px 10px;
      font-size: 16px;
      margin: 15 / @px;
    }
  }
}
.active {
  border-color: #ddd;
  //   background: #eee;
  color: #999;
}
</style>