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
      path: "/search/:content",
      name: "Search",
      component: () => import("../views/SearchPage")
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
      path: '/chart',
      name: 'Chart',
      component: () => import("../views/Chart")
    },
    {
      path: '/tag',
      name: 'Tag',
      component: () => import("../views/Tag")
    },
    {
      path: '/mine',
      name: 'Mine',
      meta: {
        requireAuth: true,
      },
      component: () => import("../views/Mine")
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {
        requireAuth: true,
      },
      component: () => import("../views/Profile")
    },
    {
      path: '/taste',
      name: 'Taste',
      meta: {
        requireAuth: true,
      },
      component: () => import("../views/Taste")
    },
    {
      path: "*",
      name: "404",
      component: () => import("../views/NotFound"),
      meta: {
        keepAlive: false
      }
    }
  ],
  mode: "history"
}
