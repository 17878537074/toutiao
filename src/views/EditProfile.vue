<template>
  <div>
    <Navigatebar title="个人中心"></Navigatebar>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL+userInfo.head_img" alt />
      <van-uploader class="upload" :after-read="afterRead" />
    </div>
    <Listbar lable="昵称" :tips="userInfo.nickname"></Listbar>
    <Listbar lable="密码" tips="******"></Listbar>
    <Listbar lable="性别" :tips="['女','男'][userInfo.gender]"></Listbar>
  </div>
  <!-- :tips="userInfo.nickname" -->
  <!-- :tips="['女','男'][userInfo.gender]" -->
</template>

<script>
import Listbar from "@/components/Listbar";
import Navigatebar from "@/components/Navigatebar";
export default {
  data() {
    return {
      userInfo: {},
      userJson: {}
    };
  },
  components: {
    Navigatebar,
    Listbar
  },
  mounted() {
    const userJson = JSON.parse(localStorage.getItem("userInfo"));
    this.userJson = userJson;
    // console.log(userJson);

    this.$axios({
      url: "/user/" + userJson.user.id,
      headers: {
        Authorization: userJson.token
      }
    }).then(res => {
      console.log(res);
      const { data } = res.data;
      this.userInfo = data;
    });
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      //   console.log(file);
      const fd = new FormData();
      fd.append("file", file.file);
      this.$axios({
        url: "/upload",
        method: "post",
        headers: {
          Authorization: this.userJson.token
        },
        data: fd
      }).then(res => {
        // console.log(res);
        const { url } = res.data.data;
        this.userInfo.head_img = url;
        this.handEdit({
          head_img: url
        });
      });
      
    },
    handEdit(data) {
      this.$axios({
        url: "/user_update/" + this.userInfo.id,
        method: "post",
        headers: {
          Authorization: this.userJson.token
        },
        data
      }).then(res => {
        // console.log(res);
        this.$toast.success("头像修改成功");
      });
    }
  }
};
</script>

<style lang="less" scoped>
@px: 360/100vw;
.avatar {
  display: flex;
  padding: 20 / @px;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    display: block;
    width: 70 / @px;
    height: 70 / @px;
    border-radius: 50%;
    background: red;
    object-fit: contain;
  }
  .upload {
    position: absolute;
    bottom: 10px;
    opacity: 0;
  }
}
</style>