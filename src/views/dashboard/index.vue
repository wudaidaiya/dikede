<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name</div>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {},
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    position: relative;
    left: 0;
    top: 50px;
    margin: 30px;
    padding-top: 60px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
