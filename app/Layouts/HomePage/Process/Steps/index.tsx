import "./style.css";
import H5Styling from "~/components/Typography/H5";
import Paragraph from "~/components/Typography/Paragraph";

type ProcessStepsProps = {
  imgUrl: string;
  imgUrlDesktop: string;
  altImg: string;
  processTitle: string;
  processText: string;
  heightMobile: number;
  urlLoad: string;
  windowWidth: number | undefined;
};

const ProcessSteps = ({
  processText,
  processTitle,
  altImg,
  imgUrl,
  imgUrlDesktop,
  heightMobile,
  urlLoad,
  windowWidth,
}: ProcessStepsProps) => {
  return (
    <div className="container-step-div">
      <div className="div-img-step">
        <img
          src={`${urlLoad}${
            (windowWidth as number) < 1024 ? imgUrl : imgUrlDesktop
          }`}
          alt={altImg}
          height={(windowWidth as number) < 1024 ? heightMobile : undefined}
          width={(windowWidth as number) < 1024 ? 91 : undefined}
        />
      </div>
      <div className="div-container-step">
        <H5Styling variant="secondary" style={{ textAlign: "center" }}>
          {processTitle}
        </H5Styling>
        <div className="spacing-text-step">
          <Paragraph style={{ color: "#475467", textAlign: "center" }}>
            {processText}
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default ProcessSteps;
