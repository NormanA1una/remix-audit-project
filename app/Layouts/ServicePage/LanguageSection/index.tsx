import Card from "~/components/Card";
import "./style.css";

import H6Styling from "~/components/Typography/H6";
import Title from "~/components/Typography/Title";
import Paragraph from "~/components/Typography/Paragraph";

const languageCardData = [
  {
    title: "Spanish",
    text: "The core of our business is our translation team. Through the years we've assembled an amazing group that share our values. We take a rigorous approach to quality.",
    imgComponent: {
      flag: {
        src: "/images/spanishLanguage.svg",
        alt: "Spanish flag in a circle",
      },
      person: {
        src: "/images/personSpanishLanguage.svg",
        alt: "Woman sitting on a bench with her arms up",
      },
    },
  },
  {
    title: "English",
    text: "The core of our business is our translation team. Through the years we've assembled an amazing group that share our values. We take a rigorous approach to quality.",
    imgComponent: {
      flag: {
        src: "/images/englishLanguage.svg",
        alt: "English flag in a circle",
      },
      person: {
        src: "/images/personEnglishLanguage.svg",
        alt: "Man sitting on a bench with her arms up",
      },
    },
  },
];

const LanguageSection = ({
  dataStrapi,
  urlLoad,
}: {
  dataStrapi: LanguageList;
  urlLoad: string;
}) => {
  return (
    <div className="language-div-container">
      <div className="language-principal-text">
        <Title style={{ textAlign: "center", color: "#151718" }}>
          {dataStrapi
            ? dataStrapi.LanguageHeader.Title
            : "Lorem ipsum dolor sit amet, Benefits"}
        </Title>
        <div className="spacing-subtitle-language">
          <H6Styling style={{ textAlign: "center", color: "#333333" }}>
            {dataStrapi
              ? dataStrapi.LanguageHeader.Subtitle
              : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque commodo quam Lorem."}
          </H6Styling>
        </div>
      </div>

      <div className="div-languages-cards">
        {dataStrapi
          ? dataStrapi.LanguageCard.map((language) => {
              return (
                <Card
                  key={language.id}
                  variant="basic"
                  border={true}
                  classNames="language-card-custom"
                >
                  <div
                    className={`div-conatiner-language-card ${
                      language.Title === "English"
                        ? "english-card-content-position"
                        : language.Title === "Inglés"
                        ? "english-card-content-position"
                        : null
                    }`}
                  >
                    <div className="div-text-language-card">
                      <Title
                        style={{ color: "#101828" }}
                        className="language-card-title"
                      >
                        {language.Title}
                      </Title>
                      <Paragraph
                        style={{ color: "#475467", lineHeight: "26px" }}
                      >
                        {language.Content}
                      </Paragraph>
                    </div>

                    <div
                      className={`div-wrapper-absolute ${
                        language.Title === "Spanish"
                          ? "spanish-absolute"
                          : language.Title === "Español"
                          ? "spanish-absolute"
                          : "english-absolute"
                      }`}
                    >
                      <div className="div-wrapper-relative">
                        <img
                          src={`${urlLoad}${language.LanguageFlag.Icon.data.attributes.url}`}
                          alt={language.LanguageFlag.Alt}
                          className={`${
                            language.Title === "Spanish"
                              ? "spanish-flag-absolute"
                              : language.Title === "Español"
                              ? "spanish-flag-absolute"
                              : "english-flag-absolute"
                          }`}
                        />
                        <img
                          src={`${urlLoad}${language.LanguagePerson.Icon.data.attributes.url}`}
                          alt={language.LanguagePerson.Alt}
                          className="persona-dimension"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })
          : languageCardData.map((language) => {
              return (
                <Card
                  key={language.title}
                  variant="basic"
                  border={true}
                  classNames="language-card-custom"
                >
                  <div
                    className={`div-conatiner-language-card ${
                      language.title === "English"
                        ? "english-card-content-position"
                        : null
                    }`}
                  >
                    <div className="div-text-language-card">
                      <Title
                        style={{ color: "#101828" }}
                        className="language-card-title"
                      >
                        {language.title}
                      </Title>
                      <Paragraph
                        style={{ color: "#475467", lineHeight: "26px" }}
                      >
                        {language.text}
                      </Paragraph>
                    </div>

                    <div
                      className={`div-wrapper-absolute ${
                        language.title === "Spanish"
                          ? "spanish-absolute"
                          : "english-absolute"
                      }`}
                    >
                      <div className="div-wrapper-relative">
                        <img
                          src={language.imgComponent.flag.src}
                          alt={language.imgComponent.flag.alt}
                          className={`${
                            language.title === "Spanish"
                              ? "spanish-flag-absolute"
                              : "english-flag-absolute"
                          }`}
                        />
                        <img
                          src={language.imgComponent.person.src}
                          alt={language.imgComponent.person.src}
                          className="persona-dimension"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
      </div>
    </div>
  );
};

export default LanguageSection;
