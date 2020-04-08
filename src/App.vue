<template>
  <div id="app">
    <!-- keep-alive会缓存组件，如果不加include会缓存所有的组件。但是include需要指定缓存哪个页面的缓存，取的是组件里的那么值 -->
    <keep-alive include="index">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less">
// 公共样式
@import url("//at.alicdn.com/t/font_1426139_jm7n2373nlh.css");
@import url("../node_modules/vant/lib/index.css");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  color: inherit;
}

ul {
  list-style: none;
}
i,
em {
  font-style: normal;
}
</style>
<script>
export default {
  methods: {
    login() {
      // console.log(111);
      this.$toast("提示文案111");
    }
  }
};
</script>