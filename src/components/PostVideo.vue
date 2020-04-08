<template>
     <router-link :to="`/video/${data.id}`"> 
  <div>
    <div class="video">
      <h4>{{data.title}}</h4>
      <div class="cover">
        <img :src="$axios.defaults.baseURL + data.cover[0].url" alt />
        <div class="cover-layer">
          <span class="iconfont iconshipin"></span>
        </div>
      </div>
         <p>{{data.user.nickname}} {{data.comment_length}}跟帖</p>
    </div>
  </div>
  </router-link>
</template>

<script>
export default {
props: ['data'],

};
</script>

<style lang="less" scoped>
@px: 360/100vw;
.video {
  padding: 20 / @px;
  border-bottom: 1px solid #eee;
  h4 { 
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .cover{
      width: 100%;
      height: 170/@px;
      position: relative;
      margin: 20/@px 0;
      img{
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
      }
     .cover-layer{
         width: 55/@px;
         height: 55/@px;
         border-radius: 50%;
         background: rgba(0, 0, 0, .5);
         position: absolute;
         left: 50%;
         top: 50%;
         transform: translateX(-27/@px) translateY(-27/@px);
         display: flex;
         justify-content: center;
         align-items: center;
         .iconshipin{
             color: #fff;
             font-size: 32px;
         }
     }
  }
    p {
    color: #999;
  }
}
</style>