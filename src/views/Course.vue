<template>
  <app-grid
    v-if="course"
    :item="course"
    :get-image="getImage"
    :get-title="getTitle"
    :get-subtitle="getSubtitle"
    :animation="true"
    @click="goToPresentation"
  />
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import { plurals } from "@/models/helpers";
import AppGrid from "@/components/AppGrid";
export default {
  components: {
    AppGrid
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
    getImage(presentation) {
      return presentation.slides[0];
    },
    getTitle() {
      return "";
    },
    getSubtitle() {
      // const strings = [
      //   plurals(presentation.slides, "diapositiva", "diapositivas"),
      //   plurals(presentation.videos, "video", "videos"),
      //   plurals(presentation.audios, "audio", "audios")
      // ];
      // return strings.join(" / ");
      return "";
    }
  }
};
</script>
