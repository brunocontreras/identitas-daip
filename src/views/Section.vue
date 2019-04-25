<template>
  <div v-if="section" class="section">
    <div class="cover" :style="{ backgroundImage: `url(${coverImage})` }" />
    <div class="md-display-1">{{ section.name }}</div>
    <div v-if="section.children" class="grid">
      <app-card
        v-for="course in section.children"
        :key="`course${course.id}`"
        :title="course.name"
        :subtitle="`${course.children.length} presentaciones`"
        @click="goToCourse(course)"
      >
        <md-avatar v-for="presentation in course.children" :key="`presentation${presentation.id}`">
          <app-image :src="presentation.slides[0]" />
        </md-avatar>
      </app-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AppCard from "@/components/AppCard";
import AppImage from "@/components/AppImage";
export default {
  components: {
    AppCard,
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
    },
    coverImage() {
      let item = this.section;
      while (item.parent) item = item.parent;
      return require(`@/assets/${item.image}`);
    }
  },
  methods: {
    ...mapMutations(["SET_CURRENT"]),
    goToCourse(course) {
      this.$router.push(`/course/${course.id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 2rem;
  position: relative;
}
.cover {
  position: fixed;
  top: -15px;
  bottom: -15px;
  left: -15px;
  right: -15px;
  background-size: cover;
  background-position-y: 20%;
  z-index: -1;
  filter: blur(15px) brightness(0.75);
}
.md-display-1 {
  text-align: center;
  margin-top: 4rem;
  color: #fff !important;
  text-shadow: 0 0 6px rgba(0, 0, 0, 1);
}
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;
}
.md-avatar {
  margin: 2px;
  img {
    transform: scale(1.5);
  }
}
</style>
