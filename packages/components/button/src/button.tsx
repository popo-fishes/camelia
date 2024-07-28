/*
 * @Date: 2024-07-27 13:49:35
 * @Description: Modify here please
 */
import React, { Children, createRef, useContext, useEffect, useMemo, useState } from "react";

const Button = () => {
  const [a, set] = useState(null);
  function isSameOptions(a: any[], b: any[]) {
    if (a.length !== b.length) return false;
    for (const [index] of a.entries()) {
      if (JSON.stringify(a[index]) != JSON.stringify(b[index])) {
        return false;
      }
    }
    return true;
  }
  const abc = async () => {
    return 123;
  };
  useEffect(() => {
    abc();
  }, []);
  return <div>123</div>;
};

export default Button;
