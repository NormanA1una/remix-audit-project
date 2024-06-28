import { CSSProperties, FC, PropsWithChildren } from "react";
import "./style.css";

type H4StylingProps = {
  style?: CSSProperties;
};

const H4Styling: FC<PropsWithChildren & H4StylingProps> = ({
  children,
  style,
}) => {
  return (
    <h4 className="h4-styling" style={style}>
      {children}
    </h4>
  );
};

export default H4Styling;
