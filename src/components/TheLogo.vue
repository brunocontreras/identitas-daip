<template>
  <router-link to="/" class="applogo" @mouseenter.native="hover = true" @mouseleave.native="hover = false">
    <app-logo width="100px" :white="hover" />
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
