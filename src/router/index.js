import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "帝可得", icon: "home" },
      },
    ],
  },

  {
    path: "/task",
    component: Layout,
    redirect: "/task/business",
    name: "task",
    meta: { title: "工单管理", icon: "task" },
    children: [
      {
        path: "/task/business",
        name: "business",
        component: () => import("@/views/business/index"),
        meta: { title: "运营工单" },
      },
      {
        path: "/task/operation",
        name: "operation",
        component: () => import("@/views/operation/index"),
        meta: { title: "运维工单" },
      },
    ],
  },

  {
    path: "/node",
    component: Layout,
    redirect: "/node/region",
    meta: { title: "点位管理", icon: "node" },
    children: [
      {
        path: "region",
        name: "region",
        component: () => import("@/views/region/index"),
        meta: { title: "区域管理" },
      },
      {
        path: "node",
        name: "node",
        component: () => import("@/views/node/index"),
        meta: { title: "点位管理" },
      },
      {
        path: "partner",
        name: "partner",
        component: () => import("@/views/partner/index"),
        meta: { title: "合作商管理" },
      },
    ],
  },

  {
    path: "/vm",
    component: Layout,
    redirect: "/vm/index",
    name: "vm",
    meta: {
      title: "设备管理",
      icon: "vm",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/vm/index"),
        name: "index",
        meta: { title: "设备管理" },
      },
      {
        path: "status",
        component: () => import("@/views/status/index"),
        name: "status",
        meta: { title: "设备状态" },
      },
      {
        path: "type",
        component: () => import("@/views/type/index"),
        name: "type",
        meta: { title: "设备类型管理" },
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    redirect: "/user/index",
    name: "user",
    meta: {
      title: "人员管理",
      icon: "userM",
    },
    children: [
      {
        path: "index",
        component: () => import("@/views/user/index"),
        name: "index",
        meta: { title: "人员列表" },
      },
      {
        path: "user-task-stats",
        component: () => import("@/views/task-stats/index"),
        name: "user-task-stats",
        meta: { title: "人效统计" },
      },
      {
        path: "user-work",
        component: () => import("@/views/user-work/index"),
        name: "user-work",
        meta: { title: "工作量列表" },
      },
    ],
  },
  {
    path: "/sku",
    component: Layout,
    redirect: "/sku/sku-class",
    name: "sku",
    meta: {
      title: "商品管理",
      icon: "sku",
    },
    children: [
      {
        path: "sku-class",
        component: () => import("@/views/sku-class/index"),
        name: "sku-class",
        meta: { title: "商品类型" },
      },
      {
        path: "sku",
        component: () => import("@/views/sku/index"),
        name: "sku",
        meta: { title: "商品管理" },
      },
    ],
  },
  {
    path: "/policy",
    component: Layout,
    name: "policy",
    redirect: "/policy/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/policy/index"),
        meta: {
          title: "策略管理",
          icon: "policy",
        },
      },
    ],
  },
  {
    path: "/order",
    component: Layout,
    name: "order",
    redirect: "/order/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/order/index"),
        meta: {
          title: "订单管理",
          icon: "order",
        },
      },
    ],
  },
  {
    path: "/report",
    component: Layout,
    name: "report",
    redirect: "/report/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/report/index"),
        meta: {
          title: "对账记录",
          icon: "report",
        },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
