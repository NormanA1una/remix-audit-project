import { CSSProperties, FC, PropsWithChildren } from "react";
import "./style.css";

type H6StylingProps = {
  variant?: "primary" | "secondary";
  style?: CSSProperties;
  className?: string;
};

const H6Styling: FC<PropsWithChildren & H6StylingProps> = ({
  children,
  style,
  variant,
  className,
}) => {
  return (
    <h6
      className={`${className} ${variant === "primary" ? "h6-styling" : ""} ${
        variant === "secondary" ? "h6-variant" : ""
      }`}
      style={style}
    >
      {children}
    </h6>
  );
};

export default H6Styling;
