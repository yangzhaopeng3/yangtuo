export default {
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/Home"),
    },
    {
      path: "/subject/:movieId",
      name: "MovieDetail",
      component: () => import("../views/MovieDetail")
    },
    {
      path: '/passport',
      name: "Passport",
      component: () => import("../views/Passport"),
      meta: {
        keepAlive: false
      }
    },
    {
      path: "*",
      name: "404",
      component: () => import("../views/NotFound")
    }
  ],
  mode: "history"
}
