import { createRouter, createWebHistory } from "vue-router";
import AuthRegister from "../views/auth/AuthRegister.vue";
import AuthLogin from "../views/auth/AuthLogin.vue";
import AuthLayout from "../views/auth/AuthLayout.vue";
import PostCreate from "../views/post/PostCreate.vue";
import PostDetail from "../views/post/PostDetail.vue";
import Home from "../views/Home.vue";
import NProgress from "nprogress";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/auth",
    name: "auth",
    component: AuthLayout,
    children: [
      {
        path: "register",
        name: "register",
        component: AuthRegister,
      },
      {
        path: "login",
        name: "login",
        component: AuthLogin,
      },
    ],
  },
  {
    path: "/create",
    name: "PostCreate",
    component: PostCreate,
  },
  {
    path: "/post/:id",
    name: "PostDetail",
    props: true,
    component: PostDetail,
  },

  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(() => {
  NProgress.start();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
