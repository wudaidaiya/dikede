<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <img src="http://likede2-admin.itheima.net/img/logo.3673fab5.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 210px;
  height: 60px;
  line-height: 50px;
  background: #5373e0;
  overflow: hidden;
  img {
    width: 88px;
    height: 36px;
    margin-left: 20px;
    margin-top: 10px;
  }
}
</style>
