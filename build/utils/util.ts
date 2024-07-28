/*
 * @Date: 2024-07-28 11:20:39
 * @Description: Modify here please
 */
import fs from "fs";
import path from "path";

/** @name 将文件从文件夹移至父文件夹 */
export function moveFilesFromFolderToParent(folderPath: string, cb: () => void) {
  // 读取文件夹中的文件和子文件夹
  fs.readdir(folderPath, (err, items) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }
    items.forEach((item, index) => {
      const currentPath = path.join(folderPath, item);
      const parentPath = path.dirname(folderPath);
      const destinationPath = path.join(parentPath, item);

      // 如果是文件，则移动
      fs.stat(currentPath, (err, stats) => {
        if (err) {
          console.error(`Error getting file stats: ${err}`);
          return;
        }
        if (stats.isFile()) {
          fs.rename(currentPath, destinationPath, (err) => {
            if (err) {
              console.error(`Error moving file: ${err}`);
            } else {
              if (index == items.length - 1) {
                cb();
              }
            }
          });
        }
      });
    });
  });
}
