/*
 * @Date: 2024-07-28 21:01:55
 * @Description: Modify here please
 */
import { FooterColumn } from "rc-footer/es/column";
import { baseLink, gitHub } from "../../../../config";

export const getColumns = () => {
  const resources: FooterColumn = {
    title: "相关资源",
    items: [
      {
        title: "Fish Icons",
        url: `${gitHub}fish-icons`,
        openExternal: true
      },
      {
        title: "Umy Ui",
        url: `${gitHub}umy-ui`,
        openExternal: true
      },
      {
        title: "Fish Chat Editor",
        url: `${gitHub}fish-chat-editor`,
        openExternal: true
      }
    ]
  };

  const community: FooterColumn = {
    title: "Camellia 扩展",
    items: [
      {
        title: "String",
        url: `${baseLink}extend/string-util`,
        openExternal: true
      },
      {
        title: "Array",
        url: `${baseLink}extend/array-util`,
        openExternal: true
      },
      {
        title: "Is",
        url: `${baseLink}extend/is`,
        openExternal: true
      }
    ]
  };

  const help: FooterColumn = {
    title: "其他",

    items: [
      {
        title: "源代码",
        url: `${gitHub}camelia`,
        openExternal: true
      },
      {
        title: "React",
        url: "https://react.docschina.org/",
        openExternal: true
      },
      {
        title: "Next.js",
        url: "https://nextjs.org/docs",
        openExternal: true
      }
    ]
  };
  return [resources, community, help];
};
