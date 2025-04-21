/*

导出表格前端模块

*/
import {downFile } from "@/api/manage";

// 导出全部收录数据
export function exportShouluAll() {
    return downFile("/shoulu/export/all", null);
}
export function exportShouluWeek() {
    return downFile("/shoulu/export/week", null);

}