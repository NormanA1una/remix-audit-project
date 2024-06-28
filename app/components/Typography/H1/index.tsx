import { CSSProperties, FC, PropsWithChildren } from "react";
import "./style.css";

type H1Props = {
  style: CSSProperties;
};

const H1: FC<PropsWithChildren & H1Props> = ({ children, style }) => {
  return (
    <h1 className="h1-style" style={style}>
      {children}
    </h1>
  );
};

export default H1;
