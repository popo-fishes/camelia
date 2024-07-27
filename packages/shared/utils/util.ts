/*
 * @Date: 2024-02-04 13:57:49
 * @Description: Modify here please
 */
/**
 * @return string
 * @description: 生成一个唯一的UUid
 */
export const getUuid = (): string => {
  return Number(Math.random().toString().substring(3, 5) + Date.now()).toString(36);
};
