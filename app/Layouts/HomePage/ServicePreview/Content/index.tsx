import "./style.css";
import H6Styling from "~/components/Typography/H6";
import Paragraph from "~/components/Typography/Paragraph";

type ServiceContentProps = {
  iconUrl: string;
  title: string;
  alt: string;
  text: string;
  height: number;
  width: number;
  urlLoad: string;
};

const ServiceContent = ({
  iconUrl,
  text,
  title,
  alt,
  height,
  width,
  urlLoad,
}: ServiceContentProps) => {
  return (
    <div className="container-preview">
      <div className="div-for-image">
        <img
          src={`${urlLoad}${iconUrl}`}
          alt={alt}
          height={height}
          width={width}
        />
      </div>
      <div>
        <H6Styling
          style={{
            fontSize: "18px",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          {title}
        </H6Styling>
        <Paragraph
          style={{ textAlign: "center", color: "#475467", lineHeight: "28px" }}
        >
          {text}
        </Paragraph>
      </div>
    </div>
  );
};

export default ServiceContent;
