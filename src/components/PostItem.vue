<template>
  <div>
    <div class="star-itemm imgText">
      <div class="imgText-left">
        <h4>
          林志玲穿透视黑纱裙米兰看秀
          腹部微隆显孕味
        </h4>
        <p>火星时报    52跟帖</p>
      </div>
      <img src="../assets/hua.jpg" alt />
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
@px: 360/100vw;
.imgText {
  padding: 20 / @px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .imgText-left {
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
  }
  img {
    width: 110 / @px;
    height: 75 / @px;
    object-fit: cover;
    margin-left: 20 / @px;
    flex-shrink: 0;
  }
}
</style>