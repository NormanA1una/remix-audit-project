import { CSSProperties, FC, PropsWithChildren } from "react";
import "./style.css";

type H5StylingProps = {
  style?: CSSProperties;
  variant?: "primary" | "secondary";
};

const H5Styling: FC<PropsWithChildren & H5StylingProps> = ({
  children,
  style,
  variant = "primary",
}) => {
  return (
    <h5
      className={variant === "secondary" ? "h5-secondary" : "h5-styling"}
      style={style}
    >
      {children}
    </h5>
  );
};

export default H5Styling;
