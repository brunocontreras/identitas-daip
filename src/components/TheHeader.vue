<template>
  <header class="theheader">
    <the-logo class="logo bc-link bc-link--logo" />
    <app-arrow class="arrow" />
    <app-breadcrumb v-if="current" v-slot="{ links }" class="breadcrumb" :item="current">
      <router-link v-for="(link, i) in links" :key="i" class="bc-link" :to="link.to">
        <span class="bc-link-name">{{ link.name }}</span>
      </router-link>
      <app-arrow class="arrow" />
    </app-breadcrumb>
  </header>
</template>

<script>
import { mapState } from "vuex";
import TheLogo from "@/components/TheLogo";
import AppBreadcrumb from "@/components/AppBreadcrumb";
import AppArrow from "@/components/AppArrow";
export default {
  components: {
    TheLogo,
    AppBreadcrumb,
    AppArrow
  },
  computed: {
    ...mapState(["current"])
  }
};
</script>

<style lang="scss" scoped>
.theheader {
  --border-color: #e0e0e0;
  --size: 80px;
  height: var(--size);
  background-color: #fff;
  margin-top: 1px;
  display: flex;
  align-items: stretch;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
}
.logo {
  flex-shrink: 0;
  ::v-deep svg {
    position: relative;
    top: -8px;
  }
}
.breadcrumb {
  flex-grow: 1;
  display: flex;
}
.bc-link--logo {
  margin-left: 0;
  padding-left: 2rem;
}
.bc-link {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2rem;
  font-size: 1.8rem;
  padding-left: 4rem;
  margin-left: -2rem;
  transition-duration: 0s;
}
.bc-link-name {
  display: inline-block;
}
.arrow ::v-deep path {
  position: relative;
  z-index: 1;
  stroke: var(--border-color);
  stroke-width: 1;
  fill: #fff;
}
</style>
