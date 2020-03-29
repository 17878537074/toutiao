<template>
  <div>
    <Navigatebar title="个人中心"></Navigatebar>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL+userInfo.head_img" alt />
      <van-uploader class="upload" :after-read="afterRead" />
    </div>
    <Listbar lable="昵称" :tips="userInfo.nickname" @click.native="show=true"></Listbar>
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="handleChangeNiname">
      <van-field v-model="nickname" placeholder="请输入用户名" />
    </van-dialog>
    <Listbar lable="密码" tips="******" @click.native="showpwd=true"></Listbar>
    <van-dialog v-model="showpwd" title="修改密码" show-cancel-button @confirm="handleChangePassword">
      <van-field v-model="password" placeholder="请输入密码" type="password" />
    </van-dialog>
    <Listbar lable="性别" :tips="['女','男'][userInfo.gender]" @click.native="showGender=true"></Listbar>
    <van-action-sheet close-on-click-action  v-model="showGender" :actions="actions" @select="onSelect" />
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
      userJson: {},
      show: false,
      nickname: "",
      showpwd:false,
      password:"",
      showGender:false,
         actions: [
        { name: '男',value:1 },
        { name: '女',value:0},
     
      ]
    };
  },
  components: {
    Navigatebar,
    Listbar
  },
  mounted() {
    const userJsons = JSON.parse(localStorage.getItem("userInfo"));
    this.userJson = userJsons;
    // console.log(userJson);
    this.$axios({
      url: "/user/" + this.userJson.user.id,
      headers: {
        Authorization: this.userJson.token
      }
    }).then(res => {
      // console.log(res);
      const { data } = res.data;
      this.userInfo = data;
      this.nickname = data.nickname;
      // console.log( this.userInfo);
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
        this.handEdit(
          {
            head_img: url
          },
          "头像修改成功"
        );
      });
    },
    handEdit(data, hint) {
      this.$axios({
        url: "/user_update/" + this.userInfo.id,
        method: "post",
        headers: {
          Authorization: this.userJson.token
        },
        data
      }).then(res => {
        // console.log(res);
        this.$toast.success(hint);
      });
    },
    handleChangeNiname() {
      this.handEdit(
        {
          nickname: this.nickname
        },
        "昵称修改成功"
      );

      this.userInfo.nickname = this.nickname;
    },
    handleChangePassword(){
        this.handEdit(
        {
         password: this.password
        },
        "密码修改成功"
      );
    },
     onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
     this.handEdit(
          {
           gender: item.value
          },
          "性别修改成功"
        );
        this.userInfo.gender=item.value
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
    background: skyblue;
    object-fit: contain;
  }
  .upload {
    position: absolute;
    bottom: 10px;
    opacity: 0;
  }
}
</style>