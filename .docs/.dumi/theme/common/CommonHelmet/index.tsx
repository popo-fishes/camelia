/*
 * @Date: 2024-08-21 20:20:22
 * @Description: Modify here please
 */
import { Helmet, useRouteMeta } from "dumi";
import React, { useMemo } from "react";

/** 动态配置 head 中的标签 */
const CommonHelmet: React.FC = () => {
  const meta = useRouteMeta();

  const [title, description] = useMemo<[string, string]>(() => {
    let helmetTitle: string;
    if (!meta.frontmatter.subtitle && !meta.frontmatter.title) {
      helmetTitle = "404 Not Found - Camelia";
    } else {
      helmetTitle = `${meta.frontmatter?.title || ""} - Camelia`;
      if (meta.frontmatter?.title == "Camelia") {
        helmetTitle = "Camelia - 轻量级简洁的UI设计, React 组件库";
      }
    }
    const helmetDescription = meta.frontmatter.description || "";
    return [helmetTitle, helmetDescription];
  }, [meta]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};

export default CommonHelmet;
