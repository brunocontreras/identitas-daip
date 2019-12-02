<template>
  <router-link to="/" class="applogo" @mouseenter.native="hover = true" @mouseleave.native="hover = false">
    <app-logo class="logo" :white="hover" />
  </router-link>
</template>

<script>
import AppLogo from "@/components/AppLogo";
export default {
  components: {
    AppLogo
  },
  data: () => ({
    hover: false
  })
};
</script>

<style lang="scss" scoped>
.logo {
  width: 80px;
  top: 0 !important;
  path {
    fill: #000;
  }
}
</style>
