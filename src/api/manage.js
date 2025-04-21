import { axios } from "@/utils/request";

export function postAction(url, parameter) {
  return axios({
    url: url,
    method: "post",
    data: parameter,
  });
}

export function httpAction(url, parameter, method) {
  return axios({
    url: url,
    method: method,
    data: parameter,
  });
}

export function putAction(url, parameter) {
  return axios({
    url: url,
    method: "put",
    data: parameter,
  });
}

export function getAction(url, parameter) {
  return axios({
    url: url,
    method: "get",
    params: parameter,
  });
}

export function deleteAction(url, parameter) {
  return axios({
    url: url,
    method: "delete",
    params: parameter,
  });
}

/**
 * 下载文件 用于excel导出
 * @param url
 * @param parameter
 * @returns {*}
 */
export function downFile(url, parameter) {
  return axios({
    url: url,
    params: parameter,
    method: "get",
    responseType: "blob", // 确保返回类型是 blob
    headers: {
      "Content-Type": "application/json", // 确保你发送的请求头适配后端
      Accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // 明确接受类型
    },
  });
}
