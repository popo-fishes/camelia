/*
 * @Date: 2026-01-29 16:05:39
 * @Description: 拖动某个元素，改变指定节点的高度。拖动变化高度，类似<textarea> 元素
 */
import { useEffect, useCallback, useRef } from "react";

interface UseDragResizeProps {
  // 最小高度
  minHeight: number;
  // 最大高度
  maxHeight?: number;
  // 初始化高度
  initialHeight?: number;
  // 高度变化回调
  onChange?: (height: number) => void;
}

const useDragResize = (props: UseDragResizeProps) => {
  const { minHeight, maxHeight, initialHeight, onChange } = props;
  // 初始鼠标Y坐标
  const startYRef = useRef<number>(0);
  // 初始容器高度
  const startHeightRef = useRef<number>(0);
  // 容器引用
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      if (initialHeight || minHeight) {
        containerRef.current.style.height = `${initialHeight || minHeight}px`;
      }
    }
  }, []);

  const setContainerHeight = (height: number) => {
    if (containerRef.current) {
      containerRef.current.style.height = `${height}px`;
      onChange?.(height);
    }
  };

  // 拖动
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      if (!containerRef.current) return;

      startYRef.current = e.clientY;
      startHeightRef.current = containerRef.current.offsetHeight;

      // 设置全局光标样式
      document.body.style.cursor = "s-resize";
      document.body.style.userSelect = "none"; // 防止文本选中

      const handleMouseMove = (moveEvent: MouseEvent) => {
        moveEvent.stopPropagation();
        const deltaY = moveEvent.clientY - startYRef.current;
        const newHeight = Math.min(Math.max(startHeightRef.current + deltaY, minHeight || 0), maxHeight ?? Infinity);

        // console.log(newHeight, maxHeight, minHeight)

        if (containerRef.current) {
          containerRef.current.style.height = `${newHeight}px`;
          onChange?.(newHeight);
        }
        /**
         * 使用 requestAnimationFrame 是为了优化渲染性能，确保高度更新发生在浏览器的下一帧绘制周期中。
           即使第一次已经设置了高度，requestAnimationFrame 的作用是：
           避免重复渲染冲突：如果在短时间内频繁修改样式，可能会导致浏览器多次重排（reflow）和重绘（repaint），影响性能。
           保证视觉一致性：将样式更新推迟到下一帧，可以让浏览器更高效地批量处理 DOM 变化，从而让动画更加流畅。
         */
        requestAnimationFrame(() => {
          if (containerRef.current) {
            containerRef.current.style.height = `${newHeight}px`;
          }
        });
      };

      const handleMouseUp = () => {
        // 恢复默认光标和文本选择
        document.body.style.cursor = "";
        document.body.style.userSelect = "";

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [minHeight, maxHeight, onChange]
  );

  return { containerRef, setContainerHeight, handleMouseDown };
};

export default useDragResize;
