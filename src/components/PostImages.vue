<template>
  <div>
    <!-- 多于三张图片的结构 -->
    <div class="imgList">
        <h4>迪丽热巴时尚周刊</h4>
        <div class="images">
          <img src="../assets/hua.jpg" alt v-for="(item,index) in [1,2,3]" :key="index" />
        </div>
        <p>火星周报 52帖</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@px: 360/100vw;
.imgList {
  padding: 20 / @px;
  h4 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  p {
    color: #999;
    margin-top: 5px;
  }
  .images {
    margin: 10 / @px 0;
    display: flex;
    justify-content: space-between;
    img {
      width: 32%;
      height: 75 / @px;
      object-fit: cover;
    }
  }
}
</style>