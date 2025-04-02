import { getAction, deleteAction, putAction, postAction } from "@/api/manage";

// 登录
export function loginUser(params) {
    return postAction("/user/login", params);
}
// 用户详情
export function getUserInfo(params) {
    return getAction("/user/userInfo", params);
}
// 重置密码
export function resetPasswordUser(params) {
    return postAction("/user/resetPassword", params);
}
// 根据用户id查询用户和角色之间的关联表
export function getUserRoleList(params) {
    return getAction("/user/userRoleList", params);
}
