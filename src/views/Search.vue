<template>
  <div>
    <div class="header">
      <span class="iconfont iconjiantou2"></span>
      <div class="search-wraper">
        <span class="inconfont iconsearch"></span>
        <input type="text" placeholder="请输入搜索关键字" />
        <span>搜索</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@px:360/100vw;
.header{
    padding: 5/@px 20/@px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    .search-wraper{
        flex: 1;
        margin: 0 20/@px;
        border: 1px #ccc solid;
        height: 38/@px;
        padding: 0 20/@px;
    }
}
</style>