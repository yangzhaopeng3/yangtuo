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
    }
  ],
  mode: "history"
}
