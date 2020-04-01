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
      <van-tab v-for="(item,index) in data" :key="index" :title="item">
        <p v-for="index in 100" :key="index">内容 {{ index }}</p>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { log } from 'util';
export default {
    data() {
        return {
           data:["关注","娱乐","体育","汽车","新闻","房产","明星","模特","V"],
           active:0 
        }
    },
    watch: {
     active(){
          //  console.log(this.active);
          if(this.active===this.data.length-1){
                    console.log(111);
                   this.$router.push("/栏目管理"); 
          }
           
      }
    },
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
/deep/ .van-tabs__nav{
      background: #eee;
      position: static;
  }
  /deep/ .van-tab{
    flex-basis: 15%!important;
  }
  /deep/ .van-tab:nth-last-child(2){
      background: #eee;
      width: 25px!important;
      position: absolute;
      right: 0;
      top: 0;
  }
  /deep/ .van-tabs__wrap{
    padding-right: 20/@px;
  } 
  /deep/ .van-tabs__line{
    display: none;
  }
  /deep/ .van-tab--active{
    border-bottom: 1px solid red;
  }
</style>