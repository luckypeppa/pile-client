import { createRouter, createWebHistory } from "vue-router";
import AuthRegister from "../views/auth/AuthRegister.vue";
import AuthLogin from "../views/auth/AuthLogin.vue";
import AuthLayout from "../views/auth/AuthLayout.vue";
import PostCreate from "../views/post/PostCreate.vue";
import PostDetail from "../views/post/PostDetail.vue";
import PostLayout from "../views/post/PostLayout.vue";
import PostEdit from "../views/post/PostEdit.vue";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import NetworkError from "../views/NetworkError.vue";
import NProgress from "nprogress";
import store from "@/store";
import postApi from "@/services/post";

const routes = [
  {
    path: "/",
    name: "home",
    beforeEnter: (to, from, next) => {
      store.commit("REMOVE_POSTS");
      postApi
        .getAll()
        .then((posts) => {
          store.commit("SET_POSTS", posts);
          next();
        })
        .catch((err) => {
          console.log(err);
          next({ name: "NetworkError" });
        });
    },
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
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/post/:id",
    name: "PostLayout",
    props: true,
    component: PostLayout,
    children: [
      {
        path: "",
        name: "PostDetail",
        component: PostDetail,
      },
      {
        path: "edit",
        name: "PostEdit",
        component: PostEdit,
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: "/404/:resource",
    name: "404",
    component: NotFound,
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
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
  scrollBehavior(to, from, savedPositon) {
    if (savedPositon) {
      return savedPositon;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  NProgress.start();

  const isLogin = store.getters.isLogin;
  if (to.meta.requireAuth && !isLogin) {
    next({ name: "home" });
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
