<template>
  <header class="theheader">
    <the-logo class="logo bc-link" />
    <app-breadcrumb v-if="current" v-slot="{ links }" class="breadcrumb" :item="current">
      <router-link v-for="(link, i) in links" :key="i" class="bc-link" :to="link.to">
        <span class="bc-link-name">{{ link.name }}</span>
      </router-link>
    </app-breadcrumb>
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
  --border-color: #e0e0e0;
  --size: 80px;
  height: var(--size);
  background-color: #fff;
  border: 1px solid var(--border-color);
  border-left: none;
  border-right: none;
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
  .bc-link {
    padding-left: 4rem;
  }
}
.bc-link {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2rem;
  padding-right: 2rem;
  font-size: 1.8rem;
  &::before,
  &::after {
    content: "";
    display: block;
    border-right: 1px solid var(--border-color);
    width: 1px;
    height: 42px;
    position: absolute;
    left: 100%;
  }
  &::before {
    top: 0;
    transform: rotate(-20deg);
    transform-origin: top;
  }
  &::after {
    bottom: 0;
    transform: rotate(20deg);
    transform-origin: bottom;
  }
}
.bc-link-name {
  display: inline-block;
}
</style>
