<template>
  <div>
    <slot :links="links" />
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
