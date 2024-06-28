import "./style.css";
import { CSSProperties, FC, PropsWithChildren } from "react";

type CardProps = {
  variant: "basic" | "dark" | "squared" | "testimonial" | "benefits";
  shadow?: "sm" | "md" | "lg";
  border?: boolean;
  translate?: string;
  style?: CSSProperties;
  formDimension?: boolean;
  classNames?: string;
};

const Card: FC<PropsWithChildren & CardProps> = ({
  children,
  shadow,
  variant,
  style,
  translate,
  border,
  formDimension,
  classNames,
}) => {
  return (
    <div
      className={`${classNames ? classNames : ""} ${
        variant === "basic"
          ? "basic-card"
          : variant === "dark"
          ? "dark-card"
          : ""
      } ${variant === "squared" || "testimonial" ? "basic-card" : ""} ${
        translate ? translate : ""
      } ${
        shadow === "sm"
          ? "shadow"
          : shadow === "md"
          ? "shadow-md"
          : shadow === "lg"
          ? "shadow-lg"
          : ""
      } ${border ? "border-card" : ""} ${
        formDimension ? "form-dimension" : ""
      }`}
      style={style}
    >
      {/* Divs with backgrounds squared in top */}
      <div
        className={`${
          variant === "benefits" ? "div-squared-benefits" : "hidden"
        } `}
      ></div>

      <div
        className={`${
          variant === "testimonial" ? "div-squared-testimonial" : "hidden"
        } `}
      ></div>

      <div
        className={`${
          variant !== "squared" ? "hidden" : "div-squared-top-left"
        } `}
      ></div>

      <div
        className={`${
          variant !== "squared" ? "hidden" : "div-squared-top-right"
        } `}
      ></div>

      {children}

      {/* Divs with backgrounds squared in bottom */}
      <div
        className={`${
          variant !== "squared" ? "hidden" : "div-squared-bottom-left"
        } `}
      ></div>

      <div
        className={`${
          variant !== "squared" ? "hidden" : "div-squared-bottom-right"
        } `}
      ></div>
    </div>
  );
};

export default Card;
