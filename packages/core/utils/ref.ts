/*
 * @Date: 2024-07-28 14:25:56
 * @Description: Modify here please
 */
export const fillRef = <T>(ref: React.Ref<T>, node: T) => {
  if (typeof ref === "function") {
    ref(node);
  } else if (typeof ref === "object" && ref && "current" in ref) {
    (ref as any).current = node;
  }
};

export const composeRef = <T>(...refs: React.Ref<T>[]): React.Ref<T> => {
  const refList = refs.filter(Boolean);
  if (refList.length <= 1) {
    return refList[0];
  }
  return (node: T) => {
    refs.forEach((ref) => {
      fillRef(ref, node);
    });
  };
};
