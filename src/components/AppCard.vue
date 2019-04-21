<template>
  <md-card class="appcard" :class="{ disabled }" md-with-hover @click.native="$emit('click')">
    <md-card-media>
      <app-image :src="image" />
    </md-card-media>
    <md-card-header>
      <div class="md-title">{{ title }}</div>
      <div class="md-subhead">{{ subtitle }}</div>
    </md-card-header>
  </md-card>
</template>

<script>
import AppImage from "@/components/AppImage";
export default {
  components: {
    AppImage
  },
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
.appcard {
  flex-basis: 20vw;
  min-width: 18vw;
  margin: 2.5% 0;
  overflow: hidden;
}
.disabled {
  filter: grayscale(100%);
}
</style>
