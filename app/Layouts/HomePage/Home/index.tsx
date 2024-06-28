import "./style.css";

import { useNavigate } from "@remix-run/react";

import Button from "~/components/Button";
import H5Styling from "~/components/Typography/H5";
import Hero from "~/components/Typography/Hero";

type DataTopSection = {
  dataStrapi: TopSection | undefined;
  lng: string;
};

const HomeLayout = ({ dataStrapi, lng }: DataTopSection) => {
  const navigate = useNavigate();

  return (
    <div className="hero-style-section">
      <div className="container-hero">
        <div className="pt-16 pb-14 lg:pb-28">
          <div className="lg:max-w-[1350px] mx-auto">
            <Hero
              className="principal-title-2xl"
              style={{ textAlign: "center", marginBottom: "22px" }}
            >
              {dataStrapi ? dataStrapi.HeroHeader.Title : undefined}
            </Hero>
          </div>
          <div
            className={`div-spacing-subtitle ${
              lng === "es" ? "spacing-subtitle-spanish" : undefined
            }`}
          >
            <H5Styling
              style={{
                textAlign: "center",
                color: "#D2CFCF",
                marginBottom: "38px",
              }}
            >
              {dataStrapi ? dataStrapi.HeroHeader.Subtitle : undefined}
            </H5Styling>
          </div>

          <div className="hero-buttons">
            <Button
              variant="contained"
              color="main"
              size="large"
              className="button-full md:w-fit"
              onClick={() =>
                navigate({
                  hash: "#contact-form",
                })
              }
            >
              {dataStrapi ? dataStrapi.FirstButton.Title : undefined}
            </Button>

            <Button
              variant="outline"
              size="large"
              className="button-full md:w-fit"
              onClick={() =>
                navigate({
                  hash: "/service",
                })
              }
            >
              {dataStrapi ? dataStrapi.SecondButton.Title : undefined}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
