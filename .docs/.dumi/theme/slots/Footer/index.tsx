/*
 * @Date: 2024-07-28 21:01:55
 * @Description: Modify here please
 */
import { Footer } from "dumi-theme-antd-style";
import React, { useEffect, useRef } from "react";
import { getColumns } from "./columns";
import { baseLink } from "../../../../config";
import { history, useLocation } from "umi";

export default () => {
  const columns = getColumns();
  const location = useLocation();
  const isReload = useRef(false);

  useEffect(() => {
    isReload.current = false;
    if (location.pathname && !isReload.current) {
      requestAnimationFrame(() => {
        history.replace(location.pathname);
        isReload.current = true;
      });
    }
  }, [location.pathname]);

  const bootom = (
    <>
      <a href={baseLink}> Open-source Apach2 Licensed | Copyright © 2024 | fishbubble </a>
      <br />
      fish-bubble开源社区
    </>
  );
  return <Footer bottom={bootom} columns={columns} />;
};
