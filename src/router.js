import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
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
      path: "/section/:level1/:level2?",
      name: "section",
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
