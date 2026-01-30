/*
 * @Date: 2024-08-05 22:16:34
 * @Description: Modify here please
 */
import InternalInput from "./Input";
import TextArea from "./TextArea";
export * from "./type";

type CommixComponent = typeof InternalInput & {
  TextArea: typeof TextArea;
};

const Input = InternalInput as CommixComponent;

Input.TextArea = TextArea;

export default Input;
