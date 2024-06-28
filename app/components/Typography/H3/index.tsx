import { CSSProperties, FC, PropsWithChildren } from "react";
import "./style.css";

type H3StylingProps = {
  style?: CSSProperties;
};

const H3Styling: FC<PropsWithChildren & H3StylingProps> = ({
  children,
  style,
}) => {
  return (
    <h3 className="h3-styling" style={style}>
      {children}
    </h3>
  );
};

export default H3Styling;
