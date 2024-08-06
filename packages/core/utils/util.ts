/*
 * @Date: 2024-08-05 22:58:27
 * @Description: Modify here please
 */
// 延迟一部分操作到下一个时间片再执行
export function nextTick() {
  return new Promise<void>((resolve, reject) => {
    requestAnimationFrame(() => {
      resolve();
    });
  });
}
