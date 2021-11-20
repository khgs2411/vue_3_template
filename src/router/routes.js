const routes = [
  {
    path: "/",
    stateVariable: "Index",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Index.vue"),
  },
];

export default routes;
