/*
 * @Date: 2024-07-28 21:01:55
 * @Description: Modify here please
 */
import { Footer } from "dumi-theme-antd-style";
import React, { useEffect } from "react";
import { baseLink } from "../../../../config";
import { getColumns } from "./columns";

// 全局想往页面注入功能的地方

export default () => {
  const columns = getColumns();

  useEffect(() => {
    if (document?.body) {
      document.body.classList.add("docs-app");
    }
    // 获取头部标题节点，然后给里面添加一个title
    const aDom = document.getElementsByClassName("site-1rpkcxp");
    if (aDom?.[0]) {
      const img = document.createElement("img");
      img.src = "/website-name2.png";
      img.style.objectFit = "cover";
      img.height = 32;
      img.width = 120;
      aDom[0].appendChild(img);
    }
  }, []);

  const bootom = (
    <>
      <a href={baseLink}> Open-source Apach2 Licensed | Copyright © 2024 | Fish Popo </a>
      <br />
      Fish Popo 开源社区
    </>
  );
  return <Footer bottom={bootom} columns={columns} />;
};
