/*
 * @Date: 2024-07-28 21:01:55
 * @Description: Modify here please
 */
import { FooterColumn } from 'rc-footer/es/column';

interface GetColumnParams {
  github?: string;
}
export const getColumns = () => {
  const resources: FooterColumn = {
    title: '开发组件',
    items: [
      {
        title: 'MyBatis Dynamic SQL',
        url: 'https://mybatis.org/mybatis-dynamic-sql/docs/introduction.html',
        openExternal: true,
      },
      {
        title: 'MyBatis Generator',
        url: 'http://mybatis.org/generator/',
        openExternal: true,
      },
      {
        title: 'Spring Boot',
        url: 'https://spring.io/projects/spring-boot',
        openExternal: true,
      },
      {
        title: 'junit5',
        url: 'https://junit.org/junit5/',
        openExternal: true,
      },
    ],
  };
  const community: FooterColumn = {
    title: '系统组件',
    items: [
      {
        title: 'IoTDB',
        url: 'https://iotdb.apache.org/',
        openExternal: true,
      },

      {
        title: 'EMQX',
        url: 'https://www.emqx.com/zh',
        openExternal: true,
      },
    ],
  };

  const help: FooterColumn = {
    title: '其他',

    items: [
      {
        title: '源代码',
        url: `https://gitee.com/fanhualei/wukong-doc`,
        openExternal: true,
      },
      {
        title: '前端入门',
        url: 'https://ant-learning.redhtc.com/',
        openExternal: true,
      },
      {
        title: '前端培训',
        url: 'https://aifarm.redhtc.com/',
        openExternal: true,
      },

      {
        title: 'Iot框架',
        url: 'https://aifarm-iot.redhtc.com/',
        openExternal: true,
      },
    ],
  };
  return [];
};
