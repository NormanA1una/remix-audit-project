import "./style.css";

import Title from "~/components/Typography/Title";
import H6Styling from "~/components/Typography/H6";
import Card from "~/components/Card";
import Paragraph from "~/components/Typography/Paragraph";

const smallCardsData = [
  {
    img: {
      src: "/images/loadDoc.svg",
      alt: "icon image with a doc text 1",
    },
    title: "Share team inboxes 1",
    text: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
  },
  {
    img: {
      src: "/images/loadDoc.svg",
      alt: "icon image with a doc text 2",
    },
    title: "Share team inboxes 2",
    text: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
  },
  {
    img: {
      src: "/images/loadDoc.svg",
      alt: "icon image with a doc text 3",
    },
    title: "Share team inboxes 3",
    text: "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
  },
];

const iconsWithTitleData = [
  {
    img: {
      src: "/images/loadDoc.svg",
      alt: "icon image with a doc text 4",
    },
    title: "Share team inboxes",
  },
  {
    img: {
      src: "/images/loadDoc.svg",
      alt: "icon image with a doc text 5",
    },
    title: "Share team inboxes",
  },
  {
    img: {
      src: "/images/loadDoc.svg",
      alt: "icon image with a doc text 6",
    },
    title: "Share team inboxes",
  },
];

const Values = ({
  dataStrapi,
  urlLoad,
}: {
  dataStrapi: ValuesSection;
  urlLoad: string;
}) => {
  return (
    <div className="values-div-container">
      <div className="values-principal-text">
        <Title style={{ textAlign: "center", color: "#151718" }}>
          {dataStrapi ? dataStrapi.ValuesHeader.Title : "Our values"}
        </Title>
        <div className="spacing-subtitle-values">
          <H6Styling style={{ textAlign: "center", color: "#333333" }}>
            {dataStrapi
              ? dataStrapi.ValuesHeader.Subtitle
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo quam Lorem."}
          </H6Styling>
        </div>
      </div>

      <div className="container-all-cards-values">
        <div className="container-smalls-cards-values">
          {dataStrapi
            ? dataStrapi.Value.map((data) => {
                return (
                  <Card
                    key={data.id}
                    variant="basic"
                    border={true}
                    classNames="values-card-custom"
                  >
                    <div>
                      <div className="small-img-small-card">
                        <img
                          src={`${urlLoad}${data.ValueIcon.Icon.data.attributes.url}`}
                          alt={data.ValueIcon.Alt}
                          height={data.ValueIcon.Icon.data.attributes.height}
                          width={data.ValueIcon.Icon.data.attributes.width}
                        />
                      </div>

                      <div className="text-small-card">
                        <H6Styling
                          style={{
                            textAlign: "center",
                            color: "#101828",
                            fontWeight: 600,
                          }}
                          variant="secondary"
                        >
                          {data.Title}
                        </H6Styling>
                        <Paragraph
                          style={{ textAlign: "center", color: "#475467" }}
                        >
                          {data.Content}
                        </Paragraph>
                      </div>
                    </div>
                  </Card>
                );
              })
            : smallCardsData.map((data) => {
                return (
                  <Card
                    key={data.title}
                    variant="basic"
                    border={true}
                    classNames="values-card-custom"
                  >
                    <div>
                      <div className="small-img-small-card">
                        <img
                          src={data.img.src}
                          alt={data.img.alt}
                          height={68}
                          width={68}
                        />
                      </div>

                      <div className="text-small-card">
                        <H6Styling
                          style={{
                            textAlign: "center",
                            color: "#101828",
                            fontWeight: 600,
                          }}
                          variant="secondary"
                        >
                          {data.title}
                        </H6Styling>
                        <Paragraph
                          style={{ textAlign: "center", color: "#475467" }}
                        >
                          {data.text}
                        </Paragraph>
                      </div>
                    </div>
                  </Card>
                );
              })}
        </div>

        <div>
          <Card
            variant="basic"
            border={true}
            classNames="values-large-card-custom"
          >
            <div className="wrapper-large-card">
              <div className="values-text-expertise">
                <div className="text-placement-large-card">
                  <Title
                    className="values-card-custom-text"
                    style={{ color: "#151718" }}
                  >
                    {dataStrapi
                      ? dataStrapi.ExpertiseCard.Title
                      : "Our Expertise"}
                  </Title>
                </div>
                <div className="spacing-subtitle-values">
                  <H6Styling
                    className="values-card-custom-text"
                    style={{ color: "#333333" }}
                  >
                    {dataStrapi
                      ? dataStrapi.ExpertiseCard.Content
                      : "Our team of experts understands the challenges and opportunities associated with email marketing."}
                  </H6Styling>
                </div>
              </div>

              <div className="div-large-card-img-container">
                {dataStrapi
                  ? dataStrapi.ExpertiseCard.ExpertiseIcon.map((icon, i) => {
                      return (
                        <div key={i} className="img-and-text-expertise">
                          <div className="img-expertise">
                            <img
                              src={`${urlLoad}${icon.Images.data.attributes.url}`}
                              alt={icon.Alt}
                              height={icon.Images.data.attributes.height}
                              width={icon.Images.data.attributes.width}
                            />
                          </div>

                          <div>
                            <H6Styling
                              style={{
                                textAlign: "center",
                                color: "#101828",
                                fontWeight: 600,
                              }}
                              variant="secondary"
                            >
                              {/* TODO */}
                              Share team inboxes
                            </H6Styling>
                          </div>
                        </div>
                      );
                    })
                  : iconsWithTitleData.map((icon, i) => {
                      return (
                        <div key={i} className="img-and-text-expertise">
                          <div className="img-expertise">
                            <img
                              src={icon.img.src}
                              alt={icon.img.alt}
                              height={68}
                              width={68}
                            />
                          </div>

                          <div>
                            <H6Styling
                              style={{
                                textAlign: "center",
                                color: "#101828",
                                fontWeight: 600,
                              }}
                              variant="secondary"
                            >
                              {icon.title}
                            </H6Styling>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Values;
