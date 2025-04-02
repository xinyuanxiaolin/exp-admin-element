import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
    {
        path: "/404",
        component: (resolve) => require(["@/views/error/404"], resolve),
        hidden: true,
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/login.vue"),
    },
    {
        path: "/",
        name: "Home",
        component: () => import("@/layout/index.vue"),
        // children: [
        //     {
        //         path: "dashboard", // 子路由，不要加 `/`
        //         name: "Dashboard",
        //         component: () => import("@/views/dashboard.vue"),
        //     },
        // ]
        
        
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
export default router;
