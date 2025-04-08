import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import { menuTreeList } from "@/api/system";
import { getUserInfo } from "@/api/user";
import { treeRecursionToArray } from "@/utils/index";
export default new Vuex.Store({
    state: {
        isCollapse: false, // 菜单开关
        menuList: [], // 菜单列表
        permissions: [], // 权限列表
    },
    mutations: {
        // 菜单开关
        SET_isCollapse(state, data) {
            state.isCollapse = data;
        },
        // 菜单列表
        SET_menuList(state, data) {
            state.menuList = data;
        },
        // 权限列表
        SET_permissions(state, data) {
            state.permissions = data;
        },
    },
    actions: {
        // 获取菜单
        getMenuTreeList(state) {
            return menuTreeList().then((res) => {
                if (res.code == 200) {
                    let data = menuAuthPerm(state, res.data);
                    let router = [];
                    treeRecursionToArray(data).map((item) => {
                        router.push({
                            path: item.url,
                            name: item.name,
                            icon: item.icon,
                            component: loadView(item.component),
                        });
                    });
                    router.push({ path: "*", redirect: "/404", hidden: true });
                    state.commit("SET_menuList", data);
                    return router;
                }
            });
        },
        // 获取个人信息
        getUserInfo(state) {
            return getUserInfo().then((res) => {
                if (res.code == 200) {
                    let { roles, permission } = res.data;
                    state.commit("SET_permissions", permission);
                }
            });
        },
    },
    modules: {},
});

export const loadView = (view) => {
    // 路由懒加载
    return () => import(`@/views${view}.vue`);
};
// 根据角色权限控制菜单
export const menuAuthPerm = (state, item) => {
    let allPermission = "*:*:*"; // 所有权限
    if (state.state.permissions.some((v) => v === allPermission)) {
        return item;
    } else {
        return item.filter((v) => {
            if (state.state.permissions.some((vv) => vv === v.url)) {
                return v;
            }
        });
    }
};
