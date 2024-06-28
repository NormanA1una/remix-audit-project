import "./style.css";
import H6Styling from "~/components/Typography/H6";
import Title from "~/components/Typography/Title";
import ProcessSteps from "./Steps";
import { CSSProperties, useEffect, useState } from "react";

const ProcessLayout = ({
  dataStrapi,
  urlLoad,
  lng,
}: {
  dataStrapi: ProcessSection;
  urlLoad: string;
  lng: string;
}) => {
  const [windowWidth, setWindowWidth] = useState<number | undefined>();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
  }, []);

  const handleBgElipse = (): CSSProperties | undefined => {
    if (!windowWidth) return undefined;

    if (windowWidth < 1024) return undefined;

    return {
      backgroundImage: `url('${urlLoad}${dataStrapi.BgProcessCurve.Icon.data.attributes.url}')`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center 50px",
    };
  };

  return (
    <div className="container-process">
      <div className="div-titles-process">
        <Title style={{ textAlign: "center" }}>
          {dataStrapi ? dataStrapi.ProcessHeader.Title : undefined}
        </Title>
        <div
          className={`spacing-subtitle-process ${
            lng === "es" ? "spacing-subtitle-process-spanish" : undefined
          }`}
        >
          <H6Styling style={{ textAlign: "center" }}>
            {dataStrapi ? dataStrapi.ProcessHeader.Subtitle : undefined}
          </H6Styling>
        </div>
      </div>

      <div className="elipse-bg-process" style={handleBgElipse()}>
        <div className="div-steps-process">
          {dataStrapi.Step.map((step) => (
            <ProcessSteps
              heightMobile={90}
              key={step.id}
              imgUrl={step.StepImage.Icon.data.attributes.url}
              altImg={step.StepImage.Alt}
              processTitle={step.Title}
              processText={step.Content}
              imgUrlDesktop={step.StepImageDesktop.Icon.data.attributes.url}
              urlLoad={urlLoad}
              windowWidth={windowWidth}
            />
          ))}
        </div>

        <div className="spacing-upload-img">
          <img
            src={`${urlLoad}${dataStrapi.IconUpload.Icon.data.attributes.url}`}
            alt={dataStrapi.IconUpload.Alt}
            width={dataStrapi.IconUpload.Icon.data.attributes.width}
            height={dataStrapi.IconUpload.Icon.data.attributes.height}
            className="upload-img-style"
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessLayout;
