import { getAction, deleteAction, putAction, postAction } from "@/api/manage";

// 获取对手站短剧数据情况
export function duishouVideoInfo(params) {
    return getAction("/duishou/video_info", params);
}
