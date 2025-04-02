import Vue from "vue";
import App from "./App.vue";
import "./permission";
import router from "./router";
import store from "./store";
import directive from "./directive"; // directive
import "@/assets/scss/reset.scss";
import { deepClone } from "@/utils/index";
Vue.prototype.deepClone = deepClone;
/** element */
import "./elementUI/element-variables.scss";
import element from "./elementUI/element-ui";
Vue.use(element);
/************/
Vue.config.productionTip = false;
Vue.use(directive);
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
