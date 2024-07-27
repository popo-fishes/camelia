/*
 * @Date: 2024-01-16 10:39:24
 * @Description: 字符串操作
 */
const strHandle = function (str?: any) {
  let tStr = str;
  if (str === undefined || str === null) {
    tStr = str || "";
  }
  if (typeof str == "object") {
    return JSON.stringify(str);
  } else {
    tStr += "";
    return tStr;
  }
};
/**
 * @description 清除两边所有的空格
 * @param {string} str
 * @param {boolean} isTab 是否清除所有的回车，tab符
 * @returns string
 */
export const trim = (str: string, isTab?: boolean): string => {
  const tStr = strHandle(str);
  if (isTab) {
    return tStr.replace(/(^\s+|\s+$|\t|\n|\r)/g, "");
  } else {
    return tStr.replace(/(^\s+|\s+$)/g, "");
  }
};

/**
 * @description 清除左边所有的空格
 * @param {string} str
 * @param {boolean} isTab 是否清除所有的回车，tab符
 * @returns string
 */
export const trimL = (str: string, isTab?: boolean): string => {
  const tStr = strHandle(str);
  if (isTab) {
    return tStr.replace(/(^\s*|\t|\n|\r)/g, "");
  } else {
    return tStr.replace(/(^\s*)/g, "");
  }
};

/**
 * @description 清除右边所有的空格
 * @param {string} str
 * @param {boolean} isTab 是否清除所有的回车，tab符
 * @returns string
 */
export const trimR = (str: string, isTab?: boolean): string => {
  const tStr = strHandle(str);
  if (isTab) {
    return tStr.replace(/(\s*$|\t|\n|\r)/g, "");
  } else {
    return tStr.replace(/(\s*$)/g, "");
  }
};
