import "./style.css";
import { CSSProperties, FC, PropsWithChildren } from "react";

type SmallProps = {
  style?: CSSProperties;
};

const Small: FC<PropsWithChildren & SmallProps> = ({ children, style }) => {
  return (
    <p className="small-style" style={style}>
      {children}
    </p>
  );
};

export default Small;
