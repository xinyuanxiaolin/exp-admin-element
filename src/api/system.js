import { getAction, deleteAction } from "@/api/manage";

// 菜单列表
export function menuList(params) {
    return getAction("/menu/list", params);
}
// 菜单树列表
export function menuTreeList(params) {
    return getAction("/menu/treeList", params);
}
// 删除菜单节点
export function menuDeleteBatch(params) {
    return deleteAction("/menu/deleteBatch", params);
}
// 角色和菜单关联数据树
export function roleMenuTreeList(params) {
    return getAction("/role/roleMenuTreeList", params);
}
// 角色列表
export function roleList(params) {
    return getAction("/role/list", params);
}
