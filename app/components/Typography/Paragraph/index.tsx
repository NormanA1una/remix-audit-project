import { CSSProperties, FC, PropsWithChildren } from "react";

type ParagraphProps = {
  style?: CSSProperties;
  className?: string;
};

const Paragraph: FC<PropsWithChildren & ParagraphProps> = ({
  children,
  style,
  className,
}) => {
  return (
    <p className={`paragraph-style ${className}`} style={style}>
      {children}
    </p>
  );
};

export default Paragraph;
