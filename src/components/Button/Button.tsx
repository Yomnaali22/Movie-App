import React from "react";
//styles
import { Wrapper } from "./Button.styles";

// Types
type Props = {
  text: string;
  // Won't return anything
  callback: () => void;
};

// Dynamic component
const Button: React.FC<Props> = ({ text, callback }) => (
  <Wrapper type="button" onClick={callback}>
    {text}
  </Wrapper>
);

export default Button;
