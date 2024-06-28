import { CSSProperties, FC, PropsWithChildren } from "react";
import "./style.css";

type TitleProps = {
  style?: CSSProperties;
  className?: string;
};

const Title: FC<PropsWithChildren & TitleProps> = ({
  children,
  style,
  className,
}) => {
  return (
    <h1 className={`${className} title-style`} style={style}>
      {children}
    </h1>
  );
};

export default Title;
