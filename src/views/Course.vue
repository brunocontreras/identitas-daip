<template>
  <div v-if="course" class="section">
    <app-breadcrumb :item="course" />
    <md-button class="md-icon-button md-raised" @click="$router.go(-1)">
      <md-icon>arrow_back</md-icon>
    </md-button>
    <span class="md-display-3">{{ course.name }}</span>
    <div v-if="course.children">
      <div class="grid">
        <md-card
          v-for="presentation in course.children"
          :key="presentation.name"
          md-with-hover
          @click.native="goToPresentation(presentation)"
        >
          <md-ripple>
            <md-card-media>
              <img class="image" :src="presentation.slides[0]" @load="onImageLoaded" />
            </md-card-media>
            <md-card-header>
              <div class="md-title">
                {{ presentation.name }}
              </div>
              <div class="md-subhead">{{ presentation.slides.length }} diapositivas</div>
            </md-card-header>
          </md-ripple>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppBreadcrumb from "@/components/AppBreadcrumb";
export default {
  components: {
    AppBreadcrumb
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
      return this.data.courses.find(x => x.id === parseInt(this.id));
    }
  },
  methods: {
    goToPresentation(presentation) {
      this.$router.push(`/presentation/${presentation.id}`);
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
