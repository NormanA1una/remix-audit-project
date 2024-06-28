import { CSSProperties, FC, PropsWithChildren } from "react";
import "./style.css";

type H2Props = {
  style?: CSSProperties;
};

const H2: FC<PropsWithChildren & H2Props> = ({ children, style }) => {
  return (
    <h2 className="h2-style" style={style}>
      {children}
    </h2>
  );
};

export default H2;
