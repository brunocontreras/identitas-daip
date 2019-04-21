<template>
  <div class="appbreadcrumb">
    <span v-for="(link, i) in links" :key="i">
      <router-link :to="link.to">{{ link.name }}</router-link>
      <span v-if="i < links.length - 1" class="dot"></span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    links() {
      const links = [];
      let item = this.item;
      while (item) {
        links.unshift({
          name: item.name,
          to: {
            name: item.type.toLowerCase(),
            params: { id: item.id }
          }
        });
        item = item.parent;
      }
      return links;
    }
  }
};
</script>

<style lang="scss" scoped>
.appbreadcrumb {
  font-size: 2.4rem;
  font-weight: 400;
}
.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin: 0 0.5em 3px;
  border-radius: 50%;
  background-color: #ccc;
}
</style>
