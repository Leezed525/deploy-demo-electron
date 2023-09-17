import Vue from 'vue';
import Router from 'vue-router';


// import login from "@/views/system/login/index.vue";
// import index from "@/views/system/index/index.vue";

Vue.use(Router);


export const constantRoutes = [
    {
        path: "",
        redirect: 'index',

    },
    {
        path: '/index',
        component: () => import('@/views/system/index/index.vue'),
        // component: index,
    },
    {
        path: '/login',
        component: () => import("@/views/system/login/index.vue"),
        hidden: true
    },
];

export default new Router({
    base: "/",
    // mode: 'history', // 去掉url中的#
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})
