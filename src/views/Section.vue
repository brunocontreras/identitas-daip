<template>
  <app-grid v-if="section" :item="section" :get-title="getTitle" :get-subtitle="getSubtitle" @click="goToCourse">
    <template v-slot="{ item }">
      <div class="avatars">
        <md-avatar v-for="presentation in item.children" :key="`presentation${presentation.id}`" class="avatar">
          <app-image :src="presentation.slides[0]" />
        </md-avatar>
      </div>
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
    getTitle(course) {
      return course.name;
    },
    getSubtitle(course) {
      return `${course.children.length} presentaciones`;
    }
  }
};
</script>

<style lang="scss" scoped>
.avatars {
  display: flex;
  flex-wrap: wrap;
}
.avatar {
  background-color: #e9e9e9;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin: 2px;
  img {
    transform: scale(1.5);
  }
}
</style>
