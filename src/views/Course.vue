<template>
  <div v-if="course">
    <app-grid :item="course" @click="goToPresentation" />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
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
    }
  }
};
</script>
