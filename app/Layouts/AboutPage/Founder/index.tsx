import "./style.css";

import Title from "~/components/Typography/Title";
import H4Styling from "~/components/Typography/H4";
import Paragraph from "~/components/Typography/Paragraph";

const Founder = ({
  dataStrapi,
  urlLoad,
}: {
  dataStrapi: FounderSection;
  urlLoad: string;
}) => {
  return (
    <div className="founder-div-container">
      <div className="container-full-wrap">
        <div className="div-container-founder-img">
          <img
            src={`${urlLoad}${dataStrapi.FounderImage.Icon.data.attributes.url}`}
            alt={dataStrapi.FounderImage.Alt}
            width={dataStrapi.FounderImage.Icon.data.attributes.width}
            height={dataStrapi.FounderImage.Icon.data.attributes.height}
            className="effect-founder-img"
          />
        </div>

        <div className="container-text-founder">
          <div className="div-name-founder">
            <Title style={{ color: "#101828" }}>
              {dataStrapi ? dataStrapi.Title : "Meet our founder"}
            </Title>
            <H4Styling style={{ color: "#101828" }}>
              {dataStrapi ? dataStrapi.Subtitle : "Nombre y apellido"}
            </H4Styling>
          </div>

          <div className="div-resume-founder">
            <Paragraph style={{ color: "#475467" }}>
              {dataStrapi
                ? dataStrapi.FirstParagraph
                : "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam."}
            </Paragraph>

            <Paragraph style={{ color: "#475467" }}>
              {dataStrapi
                ? dataStrapi.SecondParagraph
                : "Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Dolor enim eu tortor urna sed duis nulla."}
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founder;
