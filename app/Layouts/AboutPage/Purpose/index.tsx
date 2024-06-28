import "./style.css";
import Card from "~/components/Card";
import Title from "~/components/Typography/Title";
import Paragraph from "~/components/Typography/Paragraph";

const purposeData = [
  {
    title: "Mision",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet ullamco est sit aliqua dolor do amet",
    img: {
      src: "/images/misionImage.webp",
      alt: "Meeting of a work team led by a boy with glasses",
    },
  },
  {
    title: "Vision",
    text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet ullamco est sit aliqua dolor do amet",
    img: {
      src: "/images/visionImage.webp",
      alt: "Boy with glasses and black shirt at a meeting",
    },
  },
];

const Purpose = ({
  dataStrapi,
  urlLoad,
}: {
  dataStrapi: PurposeSection;
  urlLoad: string;
}) => {
  return (
    <div className="purpose-div-container">
      <Card variant="basic" border={true} classNames="purpose-card-custom">
        <div className="div-styling-content">
          {dataStrapi
            ? dataStrapi.Porpuse.map((purpose, i) => {
                return (
                  <div
                    key={purpose.id}
                    className={`div-purpose-container ${
                      i === 0 ? "mision-direction" : "vision-direction"
                    }`}
                  >
                    <div className="div-text-purpose">
                      <Title style={{ color: "#101828" }}>
                        {purpose.Title}
                      </Title>
                      <Paragraph style={{ color: "#475467" }}>
                        {purpose.Content}
                      </Paragraph>
                    </div>

                    <div
                      className={`div-img-purpose ${
                        i === 0 ? "mision-img-placement" : null
                      }`}
                    >
                      <img
                        src={`${urlLoad}${purpose.PurposeImage.Icon.data.attributes.url}`}
                        alt={purpose.PurposeImage.Alt}
                        className="img-purpose-style"
                      />
                    </div>
                  </div>
                );
              })
            : purposeData.map((purpose, i) => {
                return (
                  <div
                    key={purpose.title}
                    className={`div-purpose-container ${
                      i === 0 ? "mision-direction" : "vision-direction"
                    }`}
                  >
                    <div className="div-text-purpose">
                      <Title style={{ color: "#101828" }}>
                        {purpose.title}
                      </Title>
                      <Paragraph style={{ color: "#475467" }}>
                        {purpose.text}
                      </Paragraph>
                    </div>

                    <div
                      className={`div-img-purpose ${
                        i === 0 ? "mision-img-placement" : null
                      }`}
                    >
                      <img
                        src={purpose.img.src}
                        alt={purpose.img.alt}
                        className="img-purpose-style"
                      />
                    </div>
                  </div>
                );
              })}
        </div>
      </Card>
    </div>
  );
};

export default Purpose;
