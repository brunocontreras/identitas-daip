import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Section from "./views/Section.vue";
import Course from "./views/Course.vue";
import Presentation from "./views/Presentation.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/section/:id",
      name: "section",
      component: Section,
      props: true
    },
    {
      path: "/course/:id",
      name: "course",
      component: Course,
      props: true
    },
    {
      path: "/presentation/:id",
      name: "presentation",
      component: Presentation,
      props: true
    }
  ]
});
