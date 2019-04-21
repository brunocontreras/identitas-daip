<template>
  <header class="theheader">
    <the-logo class="logo" />
    <app-breadcrumb v-if="current" class="breadcrumb" :item="current" />
  </header>
</template>

<script>
import { mapState } from "vuex";
import TheLogo from "@/components/TheLogo";
import AppBreadcrumb from "@/components/AppBreadcrumb";
export default {
  components: {
    TheLogo,
    AppBreadcrumb
  },
  computed: {
    ...mapState(["current"])
  }
};
</script>

<style lang="scss" scoped>
.theheader {
  height: 80px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}
.logo {
  flex-shrink: 0;
}
.breadcrumb {
  flex-grow: 1;
  padding-left: 1rem;
  position: relative;
  top: 7px;
}
</style>
