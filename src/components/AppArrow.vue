<template>
  <svg width="15" :height="height" :viewBox="`0 0 15 ${height}`">
    <path :d="`M0,0 L 15,${height / 2} L 0,${height}`" />
  </svg>
</template>

<script>
export default {
  props: {
    height: {
      type: Number,
      required: true
    }
  }
};
</script>
