/*
 * @Date: 2023-12-26 20:33:23
 * @Description: Modify here please
 */
import { useRef } from "react";

import type { ImgCaptchaProps } from "./type";

/** 生成字母数组 */
const getAllLetter = () => {
  const letterStr =
    "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
  return letterStr.split(",");
};

/** 生成一个随机数 */
const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

/** 生成一个随机色 */
const randomColor = (min: number, max: number) => {
  const r = randomNum(min, max);
  const g = randomNum(min, max);
  const b = randomNum(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
};

/** 数字数组 */
const numArr = "0,1,2,3,4,5,6,7,8,9".split(",");
/** 字母数组 */
const letterArr = getAllLetter();

export function generateRandomId() {
  const randomId = Math.random().toString(36).substring(2, 9); // 生成一个长度为 9 的随机字符串
  const element = document.getElementById(randomId); // 在 DOM 中查找是否存在相同 ID 的元素
  if (element) {
    // 如果存在相同 ID 的元素，则递归调用函数生成新的随机 ID
    return generateRandomId();
  }
  return randomId;
}

export const useCaptcha = (props: ImgCaptchaProps, nodeId: string) => {
  const { width, height, id, canvasId, size, type } = {
    id: nodeId,
    canvasId: generateRandomId(),
    ...props
  };

  const imgCaptchaCode = useRef("");

  /** 初始化 */
  const init = () => {
    const con = document.getElementById(id) as HTMLElement;
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    canvas.id = canvasId;
    canvas.width = con.offsetWidth || width;
    canvas.height = con.offsetHeight || height;
    canvas.style.cursor = "pointer";
    canvas.innerHTML = "您的浏览器版本不支持canvas";
    con.appendChild(canvas);
    canvas.onclick = function (event) {
      event.stopPropagation();
      refresh();
    };
  };

  /** 生成验证码 */
  const refresh = () => {
    imgCaptchaCode.current = "";

    const canvas: any = document.getElementById(canvasId);
    let ctx = null;
    let txtArr = [];
    if (!canvas.getContext) return;
    ctx = canvas.getContext("2d");

    /** 清空一个矩形 */
    ctx.clearRect(0, 0, width, height);
    ctx.textBaseline = "middle";

    ctx.fillStyle = randomColor(180, 240);
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, width, height);

    if (type == "blend") {
      // 判断验证码类型
      txtArr = numArr.concat(letterArr);
    } else if (type == "number") {
      txtArr = numArr;
    } else {
      txtArr = letterArr;
    }

    for (let i = 1; i <= size; i++) {
      const txt = txtArr[randomNum(0, txtArr.length)];

      imgCaptchaCode.current += txt;

      ctx.font = randomNum(height / 2, height) + "px SimHei"; // 随机生成字体大小
      ctx.fillStyle = randomColor(50, 160); // 随机生成字体颜色
      // ctx.fillStyle = "rgb(46, 137, 255)" // 固定字体颜色
      ctx.shadowOffsetX = randomNum(-3, 3);
      ctx.shadowOffsetY = randomNum(-3, 3);
      ctx.shadowBlur = randomNum(-3, 3);
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      const x = (width / (size + 1)) * i;
      const y = height / 2;
      const deg = randomNum(-30, 30);
      /**设置旋转角度和坐标原点**/
      ctx.translate(x, y);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(txt, 0, 0);
      /**恢复旋转角度和坐标原点**/
      ctx.rotate((-deg * Math.PI) / 180);
      ctx.translate(-x, -y);
    }
    /** 绘制干扰线 */
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = randomColor(40, 180);
      ctx.beginPath();
      ctx.moveTo(randomNum(0, width), randomNum(0, height));
      ctx.lineTo(randomNum(0, width), randomNum(0, height));
      ctx.stroke();
    }
  };

  return {
    imgCaptchaCode,
    init,
    refresh
  };
};
