/*
 * @Date: 2024-08-05 22:16:34
 * @Description: Modify here please
 */
import InternalInput from "./input";
import TextArea from "./text-area";
export * from "./type";

type CompoundedComponent = typeof InternalInput & {
  TextArea: typeof TextArea;
};

const Input = InternalInput as CompoundedComponent;

Input.TextArea = TextArea;

export default Input;
