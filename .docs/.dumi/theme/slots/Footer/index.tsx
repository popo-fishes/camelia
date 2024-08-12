/*
 * @Date: 2024-07-28 21:01:55
 * @Description: Modify here please
 */
import { Footer } from "dumi-theme-antd-style";
import React, { useEffect, useRef } from "react";
import { getColumns } from "./columns";
import { baseLink } from "../../../../config";
import { useLocation } from "umi";

let timer: any = null;

// 全局想往页面注入功能的地方

export default () => {
  const columns = getColumns();
  const location = useLocation();
  const v = window.localStorage.getItem("pageIsReload");
  const isReload = useRef(v);

  useEffect(() => {
    clearTimeout(timer);

    window.localStorage.setItem("pageIsReload", "0");

    if (location.pathname && isReload.current !== "1") {
      window.localStorage.setItem("pageIsReload", "1");
      window.location?.reload();
    }
  }, [location.pathname, isReload.current]);

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
