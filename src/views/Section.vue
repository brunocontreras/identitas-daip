<template>
  <div v-if="section" class="section">
    <div class="md-display-1">{{ section.name }}</div>
    <div v-if="section.children">
      <div class="grid">
        <md-card
          v-for="course in section.children"
          :key="`course${course.id}`"
          md-with-hover
          @click.native="goToCourse(course)"
        >
          <md-card-content>
            <md-avatar v-for="presentation in course.children" :key="`presentation${presentation.id}`">
              <app-image :src="presentation.slides[0]" />
            </md-avatar>
          </md-card-content>
          <md-card-header>
            <div class="md-title">{{ course.name }}</div>
            <div class="md-subhead">{{ course.children.length }} presentaciones</div>
          </md-card-header>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AppImage from "@/components/AppImage";
export default {
  components: {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 2rem;
}
.md-display-1 {
  text-align: center;
  margin-top: 4rem;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;
}
.md-card {
  flex-basis: 20vw;
  min-width: 18vw;
  margin: 2.5% 0;
  overflow: hidden;
}
.md-subhead {
  margin-top: 1rem;
}
.md-avatar {
  margin: 2px;
}
.image {
  opacity: 0;
  transition: opacity 0.25s;
}
.image--show {
  opacity: 1;
}
</style>
