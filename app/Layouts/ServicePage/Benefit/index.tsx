import "./style.css";

import Card from "~/components/Card";
import H6Styling from "~/components/Typography/H6";
import Title from "~/components/Typography/Title";
import H2 from "~/components/Typography/H2";
import Paragraph from "~/components/Typography/Paragraph";

const mosaicoPhoto = [
  {
    src: "/images/guaranteedPlaceholder.svg",
    alt: "Is a placeholder meanwhile",
  },
  {
    src: "/images/guaranteedPlaceholder.svg",
    alt: "Is a placeholder meanwhile",
  },
  {
    src: "/images/guaranteedPlaceholder.svg",
    alt: "Is a placeholder meanwhile",
  },
  {
    src: "/images/guaranteedPlaceholder.svg",
    alt: "Is a placeholder meanwhile",
  },
];

const benefitsCard = [
  {
    title: "Responsive support",
    text: "Our customer service team is continually ready to assist with any questions you might have during the translation process.",
    bgImg: "bg-[url('/images/benefit1.webp')]",
  },
  {
    title: "On-time delivery",
    text: " Do not worry about your documents not being ready; we will deliver at the requested time without any delays.",
    bgImg: "bg-[url('/images/benefit1.webp')]",
  },
];

const Benefit = ({
  dataStrapi,
  urlLoad,
}: {
  dataStrapi: BenefitList;
  urlLoad: string;
}) => {
  return (
    <div className="benefit-div-container">
      <div className="benefit-principal-text">
        <Title style={{ textAlign: "center" }} className="benefit-typo-custom">
          {dataStrapi
            ? dataStrapi.BenefitHeader.Title
            : "Why risk your immigration process for a wrongly translated document?"}
        </Title>
        <div className="spacing-subtitle-benefit">
          <H6Styling style={{ textAlign: "center" }}>
            {dataStrapi
              ? dataStrapi.BenefitHeader.Subtitle
              : "With a dedicated team of professionals and years of industry experience, we ensure accurate translations. Law firms entrust us with their clients' documents to take care of translations and facilitate their immigration journey."}
          </H6Styling>
        </div>
      </div>

      <div className="div-wrapper-benefit-card">
        <Card variant="testimonial" border={true} classNames="benefit-big-card">
          <div className="div-container-big-card">
            <div className="div-image-mosaico">
              {dataStrapi
                ? dataStrapi.BenefitMosaicoCard.MosaicoImage.map((photo) => {
                    return (
                      <div key={photo.id}>
                        <img
                          src={`${urlLoad}${photo.Images.data.attributes.url}`}
                          alt={photo.Alt}
                          className="mosaico-style"
                        />
                      </div>
                    );
                  })
                : mosaicoPhoto.map((photo, i) => {
                    return (
                      <div key={i}>
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="mosaico-style"
                        />
                      </div>
                    );
                  })}
            </div>
            <div className="div-benefit-text">
              <H2 style={{ color: "#101828" }}>
                {dataStrapi
                  ? dataStrapi.BenefitMosaicoCard.Title
                  : "Guaranteed acceptance"}
              </H2>
              <Paragraph style={{ color: "#344054", lineHeight: "30px" }}>
                {dataStrapi
                  ? dataStrapi.BenefitMosaicoCard.Content
                  : "Our translations have a 100% acceptance rate by institutions like USCIS, ensuring your documents meet official requirements."}
              </Paragraph>
            </div>
          </div>
        </Card>

        <div className="div-container-slim-card">
          {dataStrapi
            ? dataStrapi.Benefit.map((benefit) => {
                return (
                  <Card
                    key={benefit.id}
                    variant="benefits"
                    border={true}
                    classNames="benefit-slim-card"
                  >
                    <div className="div-container-slim">
                      <div className="div-benefit-text">
                        <div className="title-slim-card-spacing">
                          <H2 style={{ color: "#101828" }}>{benefit.Title}</H2>
                        </div>
                        <Paragraph
                          style={{ color: "#344054", lineHeight: "30px" }}
                        >
                          {benefit.Content}
                        </Paragraph>
                      </div>

                      <div
                        style={{
                          background: `url('${urlLoad}${benefit.BenefitImage.Icon.data.attributes.url}')`,
                        }}
                        className={`bg-whit-image-slim-card`}
                      ></div>
                    </div>
                  </Card>
                );
              })
            : benefitsCard.map((benefit) => {
                return (
                  <Card
                    key={benefit.title}
                    variant="benefits"
                    border={true}
                    classNames="benefit-slim-card"
                  >
                    <div className="div-container-slim">
                      <div className="div-benefit-text">
                        <div className="title-slim-card-spacing">
                          <H2 style={{ color: "#101828" }}>{benefit.title}</H2>
                        </div>
                        <Paragraph
                          style={{ color: "#344054", lineHeight: "30px" }}
                        >
                          {benefit.text}
                        </Paragraph>
                      </div>

                      <div
                        className={`${benefit.bgImg} bg-whit-image-slim-card`}
                      ></div>
                    </div>
                  </Card>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Benefit;
