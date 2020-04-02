<template>
  <div>
    <div class="star-itemm imgText">
      <div class="imgText-left">
        <h4>
        {{data.title}}
        </h4>
        <p>{{data.user.nickname}}    {{data.comment_length}}跟帖</p>
      </div>
      <img :src="$axios.defaults.baseURL + data.cover[0].url" alt />
    </div>
  </div>
</template>

<script>
export default {
props: ['data'],
};
</script>

<style lang="less" scoped>
@px: 360/100vw;
.imgText {
  padding: 20 / @px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
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