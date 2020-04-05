<template>
  <div>
    <div class="header">
      <span class="iconfont iconjiantou2"></span>
      <div class="search-wraper">
        <span class="inconfont iconsearch"></span>
        <input type="text" placeholder="请输入搜索关键字" />
      </div>
      <span>搜索</span>
    </div>
    <div class="history">
      <div class="title">
        <strong>历史记录</strong>
        <span class="inconfont iconicon-test"></span>
      </div>
      <div class="hitory-list">
        <span class="item">陌上花开</span>
        <span class="item">陌上</span>
        <span class="item">陌上花</span>
        <span class="item">陌花开</span>
        <span class="item">陌上开</span>
        <span class="item">陌上花开</span>
      </div>
    </div>
    <div class="result-layer">
        <div class="result-item" v-for="index in 10">
            <p >今日关注依然是没过股票的走向</p>
            <span class="iconfont iconjiantou1"></span>
        </div>
    </div>
  </div>
</template>

<script>
export default {};
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
    .iconicon-test {
      padding: 1px;
      border: 1px solid red;
      border-radius: 50px;
    }
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
.result-layer{
    padding: 20/@px;
    position: absolute;
    top: 54/@px;
    left: 0;
    bottom:0;
    width: 100%;
    background: white;
    overflow-y: auto;
    .result-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10/@px 0;
        border-bottom: 1px solid #eee;
        p{
            flex: 1;
            margin-right: 10/@px;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        span{
            color:#999
        }
    }
}
</style>