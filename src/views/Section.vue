<template>
  <div v-if="section" class="section">
    <md-button class="md-icon-button md-raised" @click="$router.go(-1)">
      <md-icon>arrow_back</md-icon>
    </md-button>
    <span class="md-display-3">{{ section.name }}</span>
    <div v-if="section.children">
      <div class="grid">
        <md-card
          v-for="course in section.children"
          :key="`course${course.id}`"
          md-with-hover
          @click.native="goToCourse(course)"
        >
          <md-ripple>
            <md-card-header>
              <div class="md-title">{{ course.name }}</div>
              <div class="md-subhead">{{ course.children.length }} presentaciones</div>
            </md-card-header>
            <md-card-content>
              <md-avatar v-for="presentation in course.children" :key="`presentation${presentation.id}`">
                <img class="image" :src="presentation.slides[0]" @load="onImageLoaded" />
              </md-avatar>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    ...mapState(["data"]),
    section() {
      return this.data.sections.find(x => x.id === parseInt(this.id));
    }
  },
  methods: {
    goToCourse(course) {
      this.$router.push(`/course/${course.id}`);
    },
    onImageLoaded(event) {
      event.target.classList.add("image--show");
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 2rem;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  overflow-y: auto;
}
.md-card {
  flex-basis: 20vw;
  min-width: 18vw;
  margin: 2.5%;
  margin-left: 0;
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
