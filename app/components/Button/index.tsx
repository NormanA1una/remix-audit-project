import { FC, PropsWithChildren } from "react";
import "./style.css";
import { Link } from "@remix-run/react";

type ButtonProps = {
  variant: "contained" | "outline" | "url" | "icon" | "question";
  color?: "nav" | "main" | "dark" | "service" | "service blue";
  size?: "small" | "medium" | "large";
  pathName?: string;
  type?: "button" | "submit";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  value?: string;
  name?: string;
};

const Button: FC<PropsWithChildren & ButtonProps> = ({
  variant,
  color = "",
  children,
  size = "",
  pathName,
  type,
  onClick,
  className,
  value,
  name,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      name={name}
      value={value}
      type={type}
      className={`${className ? className : ""} ${variant === "icon" && ""} ${
        variant === "outline"
          ? "light-outline"
          : variant === "url"
          ? "url-style"
          : variant
      } ${
        variant === "outline"
          ? ""
          : variant === "url"
          ? ""
          : color !== "service blue"
          ? color
          : !color
          ? ""
          : "service-blue"
      } ${variant === "outline" && color === "dark" ? "dark-outline" : ""} ${
        variant === "url" ? "" : size
      } ${variant === "question" ? "questions-style" : null}`}
      onClick={handleClick}
    >
      {pathName ? <Link to={pathName}>{children}</Link> : <>{children}</>}
    </button>
  );
};

export default Button;
