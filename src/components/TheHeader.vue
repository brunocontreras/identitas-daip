<template>
  <header class="theheader">
    <the-logo class="logo bc-link bc-link--logo" />
    <app-arrow class="arrow" />
    <app-breadcrumb v-if="current" v-slot="{ links }" class="breadcrumb" :item="current">
      <template v-for="(link, i) in links">
        <router-link :key="`link${i}`" :to="link.to" class="bc-link">
          <span class="bc-link-name">{{ link.name }}</span>
        </router-link>
        <app-arrow :key="`arrow${i}`" class="arrow" />
      </template>
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
  --hover-bg-color: #333;
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
  margin-left: -15px;
  transition-duration: 0.25s;
  transition-timing-function: ease;
  transition-property: background-color, color;
  &:hover {
    background-color: var(--hover-bg-color);
    color: #fff !important;
    text-decoration: none;
    + .arrow ::v-deep path {
      fill: var(--hover-bg-color);
    }
  }
}
.bc-link-name {
  display: inline-block;
}
.arrow {
  position: relative;
  z-index: 1;
  ::v-deep path {
    stroke: var(--border-color);
    stroke-width: 1;
    fill: #fff;
    transition: fill 0.25s;
  }
}
</style>
