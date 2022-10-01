import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            // path: "/",
            // component: () => import("@/layouts/Base.vue"),
            // children: [
            //     {
            //         path: "",
            //         name: "home",
            //         component: () => import("@/pages/index.vue"),
            //     },
            //     {
            //         path: "detail/:id",
            //         name: "detail",
            //         component: () => import("@/pages/Detail.vue"),
            //     },
            // ],
        },
    ],
});

export default router;