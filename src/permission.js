import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getStore, clearAll } from "@/utils/storage";
import { Message } from "element-ui";
NProgress.configure({ showSpinner: false });

// 白名单
const whiteList = ["/login"];
/**
 * 权限管理
 */
router.beforeEach((to, from, next) => {
    NProgress.start();

    let token = getStore("token");
    if (token) {
        if (store.state.permissions.length === 0) {
            // 判断用户是否获取信息包括权限角色
            store
                .dispatch("getUserInfo")
                .then(() => {
                    store.dispatch("getMenuTreeList").then((data) => {
                        data.map((item) => {
                            router.addRoute("Home", item);
                        });
                        next({ ...to, replace: true });
                    });
                })
                .catch((err) => {
                    Message.error(err);
                    clearAll();
                    setTimeout(() => {
                        window.location.replace("/login");
                    }, 1000);
                });
        } else {
            next();
        }
    } else {
        // 没有token
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next();
        } else {
            if (to.path === "/") {
                next("/login");
            } else {
                next();
            }
        }
    }

});

router.afterEach(() => {
    NProgress.done();
});
