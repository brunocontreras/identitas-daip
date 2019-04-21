<template>
  <div v-if="course" class="section">
    <div class="md-display-1">{{ course.name }}</div>
    <div v-if="course.children">
      <div class="grid">
        <md-card
          v-for="presentation in course.children"
          :key="presentation.name"
          md-with-hover
          @click.native="goToPresentation(presentation)"
        >
          <md-card-media>
            <app-image :src="presentation.slides[0]" />
          </md-card-media>
          <md-card-header>
            <div class="md-title">
              {{ presentation.name }}
            </div>
            <div class="md-subhead">{{ getSubtitle(presentation) }}</div>
          </md-card-header>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { plurals } from "@/models/helpers";
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
    course() {
      const course = this.data.courses.find(x => x.id === parseInt(this.id));
      this.SET_CURRENT(course);
      return course;
    }
  },
  methods: {
    ...mapMutations(["SET_CURRENT"]),
    goToPresentation(presentation) {
      this.$router.push(`/presentation/${presentation.id}`);
    },
    getSubtitle(presentation) {
      const strings = [
        plurals(presentation.slides, "diapositiva", "diapositivas"),
        plurals(presentation.videos, "video", "videos"),
        plurals(presentation.audios, "audio", "audios")
      ];
      return strings.join(" · ");
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
  overflow-y: auto;
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
