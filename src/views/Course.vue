<template>
  <div v-if="course" class="section">
    <div class="md-display-1">{{ course.name }}</div>
    <div v-if="course.children">
      <div class="grid">
        <app-card
          v-for="presentation in course.children"
          :key="presentation.name"
          :image="presentation.slides[0]"
          :title="presentation.name"
          :subtitle="getSubtitle(presentation)"
          @click="goToPresentation(presentation)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { plurals } from "@/models/helpers";
import AppCard from "@/components/AppCard";
export default {
  components: {
    AppCard
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
}
.md-avatar {
  margin: 2px;
}
</style>
