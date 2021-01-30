import Vue from "vue";
import VueRouter from "vue-router";
import traffic from '../components/traffic-light.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/", redirect: "/red",
    component: traffic,
  },
  {
    path: "/red",
    name: "red",
    component: traffic,
  },
  {
    path: "/yellow",
    name: "yellow",
    component: traffic,
  },
  {
    path: "/green",
    name: "green",
    component: traffic,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
