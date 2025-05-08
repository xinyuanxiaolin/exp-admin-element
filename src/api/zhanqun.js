
import { getAction, deleteAction, putAction, postAction } from "@/api/manage";

// 获取网站测速情况
export function getSiteTimeout(params) {
    return getAction("/zhanqun/site_timeout", params);
}

//获取站群蜘蛛情况
export function getSpider(params) {
    return getAction("/zhanqun/get_spider",params);
}
//站群头条收录情况
export function getSiteShoulu(params) {
    return getAction("/zhanqun/site_shoulu",params)
}
//站群蜘蛛路径情况
export function getSpiderLogs(params) {
    return getAction("/zhanqun/spider/get_log",params)
}
