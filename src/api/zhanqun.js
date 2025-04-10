
import { getAction, deleteAction, putAction, postAction } from "@/api/manage";

// 获取网站测速情况
export function getSiteTimeout(params) {
    return getAction("/zhanqun/site_timeout", params);
}
