<template>
  <app-grid v-if="section" :item="section" :get-subtitle="getSubtitle" @click="goToCourse">
    <template v-slot="{ item }">
      <md-avatar v-for="presentation in item.children" :key="`presentation${presentation.id}`">
        <app-image :src="presentation.slides[0]" />
      </md-avatar>
    </template>
  </app-grid>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AppGrid from "@/components/AppGrid";
import AppImage from "@/components/AppImage";
export default {
  components: {
    AppGrid,
    AppImage
  },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    ...mapState(["data"]),
    section() {
      const section = this.data.sections.find(x => x.id === parseInt(this.id));
      this.SET_CURRENT(section);
      return section;
    }
  },
  methods: {
    ...mapMutations(["SET_CURRENT"]),
    goToCourse(course) {
      this.$router.push(`/course/${course.id}`);
    },
    getSubtitle(course) {
      return `${course.children.length} presentaciones`;
    }
  }
};
</script>

<style lang="scss" scoped>
.md-avatar {
  margin: 2px;
  img {
    transform: scale(1.5);
  }
}
</style>
