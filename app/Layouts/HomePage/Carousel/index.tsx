import "./style.css";
import H6Styling from "~/components/Typography/H6";
import Title from "~/components/Typography/Title";
import CarouselContent from "./Content";

const CarouselLayout = ({
  dataStrapi,
  urlLoad,
  lng,
}: {
  dataStrapi: CarouselSection;
  urlLoad: string;
  lng: string;
}) => {
  return (
    <div className="carousel-style">
      <div
        className={`carousel-div-text ${
          lng === "es" ? "spacing-spanish" : undefined
        }`}
      >
        <Title style={{ textAlign: "center" }}>
          {dataStrapi ? dataStrapi.CarouselHeader.Title : undefined}
        </Title>
        <H6Styling style={{ textAlign: "center" }}>
          {dataStrapi ? dataStrapi.CarouselHeader.Subtitle : undefined}
        </H6Styling>
      </div>
      <div>
        <CarouselContent
          testimonials={dataStrapi.Testimonial}
          urlLoad={urlLoad}
        />
      </div>
    </div>
  );
};

export default CarouselLayout;
