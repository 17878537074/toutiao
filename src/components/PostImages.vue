<template>
  <router-link :to="`/post/${data.id}`">
    <div>
      <!-- 多于三张图片的结构 -->
      <div class="imgList">
        <h4>{{data.title}}</h4>
        <div class="images">
          <img
            :src="$axios.defaults.baseURL + item.url"
            alt
            v-for="(item,index) in data.cover"
            :key="index"
          />
        </div>
        <p>{{data.user.nickname}} {{data.comment_length}}跟帖</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["data"]
};
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