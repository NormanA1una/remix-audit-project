import { CSSProperties, FC, PropsWithChildren } from "react";
import "./style.css";

type HeroTitleProps = {
  style?: CSSProperties;
  className?: string;
};

const Hero: FC<PropsWithChildren & HeroTitleProps> = ({
  children,
  style,
  className,
}) => {
  return (
    <h1
      className={`${className ? `${className} ` : ""}hero-title-style`}
      style={style}
    >
      {children}
    </h1>
  );
};

export default Hero;
