/*
 * @Date: 2024-07-28 21:01:55
 * @Description: Modify here please
 */
import { Footer } from "dumi-theme-antd-style";
import React, { useEffect } from "react";
import { baseLink } from "../../../../config";
import CommonHelmet from "../../common/CommonHelmet";
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
      aDom[0].childNodes?.[1]?.remove();
      const img = document.createElement("img");
      img.src = "/website-name1.png";
      img.style.objectFit = "contain";
      img.height = 28;
      img.width = 120;
      aDom[0].appendChild(img);
    }
  }, []);

  const bootom = (
    <>
      <a href={baseLink}>Copyright 2020 Camelia | 蜀ICP备2020025971号-1</a>
      <br />
      Fish Popo 开源社区
    </>
  );
  return (
    <>
      <CommonHelmet />
      <Footer bottom={bootom} columns={columns} />
    </>
  );
};
