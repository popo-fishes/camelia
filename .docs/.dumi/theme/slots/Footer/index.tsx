/*
 * @Date: 2024-07-28 21:01:55
 * @Description: Modify here please
 */
import { Footer } from 'dumi-theme-antd-style';
import React from 'react';
import { getColumns } from './columns';

export default () => {
  const columns = getColumns();
  const bootom = (
    <>
      <a href="https://wukong-doc.redhtc.com">
        {' '}
        Open-source Apach2 Licensed | Copyright © 2024 | littlefish{' '}
      </a>
      <br />
      fish-bubble开源社区
    </>
  );
  return <Footer bottom={bootom} columns={columns} />;
};
