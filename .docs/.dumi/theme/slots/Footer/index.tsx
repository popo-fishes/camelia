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
      <br /> Made with ❤ by <br /> 小鱼儿和开源社区
    </>
  );
  return <Footer bottom={bootom} columns={columns} />;
};
