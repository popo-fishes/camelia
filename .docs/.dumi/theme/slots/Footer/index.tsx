/*
 * @Date: 2024-07-28 21:01:55
 * @Description: Modify here please
 */
import { Footer } from "dumi-theme-antd-style";
import React from "react";
import { getColumns } from "./columns";
import { baseLink } from "../../../../config";

export default () => {
  const columns = getColumns();
  const bootom = (
    <>
      <a href={baseLink}> Open-source Apach2 Licensed | Copyright © 2024 | fishbubble </a>
      <br />
      fish-bubble开源社区
    </>
  );
  return <Footer bottom={bootom} columns={columns} />;
};
