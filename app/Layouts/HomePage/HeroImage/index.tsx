import "./style.css";
import Card from "~/components/Card";
import H5Styling from "~/components/Typography/H5";
import Industries from "./Industries";

const HeroImage = ({
  dataStrapi,
  urlLoad,
}: {
  dataStrapi: ImageHeroSection | undefined;
  urlLoad: string;
}) => {
  return (
    <div className="principal-div-hero-img">
      <div className="img-section">
        <img
          loading="eager"
          src={
            dataStrapi
              ? `${urlLoad}${dataStrapi.HeroImages.FirstFlag.Icon.data.attributes.url}`
              : undefined
          }
          alt={dataStrapi ? dataStrapi.HeroImages.FirstFlag.Alt : undefined}
          className="english-flag"
          height={
            dataStrapi
              ? dataStrapi.HeroImages.FirstFlag.Icon.data.attributes.height
              : undefined
          }
          width={
            dataStrapi
              ? dataStrapi.HeroImages.FirstFlag.Icon.data.attributes.width
              : undefined
          }
        />

        <div className="spacing-img-central-home">
          <img
            loading="eager"
            src={
              dataStrapi
                ? `${urlLoad}${dataStrapi.HeroImages.PrincipalImage.Icon.data.attributes.url}`
                : undefined
            }
            alt={
              dataStrapi ? dataStrapi.HeroImages.PrincipalImage.Alt : undefined
            }
            width={
              dataStrapi
                ? dataStrapi.HeroImages.PrincipalImage.Icon.data.attributes
                    .height
                : undefined
            }
            height={
              dataStrapi
                ? dataStrapi.HeroImages.PrincipalImage.Icon.data.attributes
                    .width
                : undefined
            }
            className="img-central-home"
          />
        </div>

        <img
          loading="eager"
          src={
            dataStrapi
              ? `${urlLoad}${dataStrapi.HeroImages.SecondFlag.Icon.data.attributes.url}`
              : undefined
          }
          alt={dataStrapi ? dataStrapi.HeroImages.SecondFlag.Alt : undefined}
          className="spanish-flag"
          height={
            dataStrapi
              ? dataStrapi.HeroImages.SecondFlag.Icon.data.attributes.height
              : undefined
          }
          width={
            dataStrapi
              ? dataStrapi.HeroImages.SecondFlag.Icon.data.attributes.width
              : undefined
          }
        />
      </div>
      <Card
        variant="basic"
        shadow="lg"
        translate="translate-card-home"
        classNames="hero-card-indutries"
      >
        <H5Styling
          style={{
            fontSize: "20px",
            color: "#53545F",
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          {dataStrapi ? dataStrapi.Title : undefined}
        </H5Styling>

        <Industries
          industries={dataStrapi ? dataStrapi.IndustriesImages : undefined}
          urlLoad={urlLoad}
        />
      </Card>
    </div>
  );
};

export default HeroImage;
