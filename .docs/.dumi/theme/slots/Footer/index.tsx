/*
 * @Date: 2024-07-28 21:01:55
 * @Description: Modify here please
 */
import { Footer } from "dumi-theme-antd-style";
import React, { useEffect } from "react";
import { getColumns } from "./columns";
import { baseLink } from "../../../../config";

// 全局想往页面注入功能的地方

export default () => {
  const columns = getColumns();

  useEffect(() => {
    if (document?.body) {
      document.body.classList.add("docs-app");
    }
  }, []);

  const bootom = (
    <>
      <a href={baseLink}> Open-source Apach2 Licensed | Copyright © 2024 | fishbubble </a>
      <br />
      fish-bubble开源社区
    </>
  );
  return <Footer bottom={bootom} columns={columns} />;
};
