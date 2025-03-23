/*
 * @Date: 2025-03-23 17:14:33
 * @Description: Modify here please
 */
import React, { useEffect } from "react";
import { createRoot } from 'react-dom/client';
import "./index.scss"
/**
 * 广告组件
 */
const Ad: React.FC = () => {
  const LinksData = [
    {
      url: "https://www.crmeb.com/?from=camelia",
      img: "/images/ad2.jpeg"
    },
    {
      url: "https://www.yisu.com/cdn/huodong.html?f=camelia",
      img: "/images/ad3.jpeg"
    }
  ]

  const AdListCom = () => {
    return (
      <div className="ad-link-box">
       {LinksData.map((item) => (
          <a
          key={item.url}
          href={item.url}
          target="_blank"
        >
          <img src={item.img} />
        </a>
       ))}
     </div>
     )
  }

  useEffect(() => {
    if (document?.body) {
      // 获取头部标题节点，然后给里面添加一个title
      const SideMenuDom = document.getElementsByClassName("site-ar97vv")?.[0] || null;
      if (SideMenuDom) {
        const container = document.createElement('div')
        const root = createRoot(container);
        root.render(<><AdListCom /></>);
        SideMenuDom.insertBefore(container, SideMenuDom.firstChild);
      }
    }
  }, [])

  return <></>
}

export default Ad
