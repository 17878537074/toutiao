<template>
  <div class="listbar">
    <router-link :to="path ||'#'">
      <!-- 左边用户功能 -->
      <div>{{lable}}</div>
      <div class="tips">
        {{tips}}
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
   props:["lable","tips","path"]
};
</script>

<style lang="less" scoped>
// 列表按钮栏的样式
@px: 360/100vw; 
.listbar {
    
  padding-left: 20 / @px;
  height: 48 / @px;
  line-height: 48 / @px;
  a {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eeeeee;
  }
  .tips {
    color: #999;
    span {
      margin-left: 5px;
    }
  }
}
</style>