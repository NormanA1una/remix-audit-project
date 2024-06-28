import "./style.css";

import { useNavigate } from "@remix-run/react";

import Hero from "~/components/Typography/Hero";
import H5Styling from "~/components/Typography/H5";
import Button from "~/components/Button";
import MosaicoAbout from "./MosaicoAbout";

const AboutPageLayout = ({
  dataStrapi,
  urlLoad,
}: {
  dataStrapi: AboutHomeSection;
  urlLoad: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className="about-home-style">
      <div className="container-about-home">
        <Hero
          style={{
            textAlign: "center",
            color: "#012F5B",
            marginBottom: "22px",
          }}
        >
          {dataStrapi
            ? dataStrapi.AboutHomeHeader.Title
            : "Lorem Ipsum Dolor Consectetur"}
        </Hero>
        <div className="div-spacing-subtitle">
          <H5Styling
            style={{
              textAlign: "center",
              color: "#53545F",
              marginBottom: "38px",
            }}
          >
            {dataStrapi
              ? dataStrapi.AboutHomeHeader.Subtitle
              : "Win back time, remove paperwork, share real-time data and grow your field service business"}
          </H5Styling>
        </div>

        <div className="about-buttons">
          <Button
            variant="contained"
            color="dark"
            size="large"
            className="about-home-button-custom"
            onClick={() =>
              navigate({
                hash: "#contact-form-about",
              })
            }
          >
            {dataStrapi ? dataStrapi.FirstButton.Title : "Lorem ipsum"}
          </Button>

          <Button
            variant="outline"
            color="dark"
            size="large"
            className="about-home-button-custom"
          >
            {dataStrapi ? dataStrapi.SecondButton.Title : "Lorem ipsum"}
          </Button>
        </div>

        <MosaicoAbout
          dataStrapiMosaico={dataStrapi.AboutHomeMosaico}
          urlLoad={urlLoad}
        />
      </div>
    </div>
  );
};

export default AboutPageLayout;
