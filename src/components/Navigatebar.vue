<template>
   <!-- 顶部导航条 -->
    <div class="navigate-bar">
      <span class="iconfont arrow iconjiantou2" @click="$router.back()"></span>
      <strong>{{title}}</strong>
      <span class="iconfont iconshouye" @click="$router.push('/')" v-if="showHome"></span>
      <span v-else></span>
    </div>
</template>

<script>
export default {
     props:["title","showHome"]
}
</script>

<style lang="less" scoped> 
@px: 360/100vw;

 .navigate-bar {
    padding: 0 20 / @px;
    line-height: 48 / @px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    span {
      font-size: 20px;
    }
  }

</style>