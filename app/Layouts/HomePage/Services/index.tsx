import "./style.css";
import Card from "~/components/Card";
import H6Styling from "~/components/Typography/H6";
import Title from "~/components/Typography/Title";
import ServicePreview from "../ServicePreview";
import Button from "~/components/Button";

const ServicesLayout = ({
  dataStrapi,
  urlLoad,
}: {
  dataStrapi: ServicesSection;
  urlLoad: string;
}) => {
  return (
    <div className="container-service">
      <div className="services-titles">
        <Title
          style={{
            textAlign: "center",
          }}
        >
          {dataStrapi ? dataStrapi.ServiceHeader.Title : undefined}
        </Title>
        <div className="spacing-subtitle-service">
          <H6Styling style={{ textAlign: "center", color: "#333333" }}>
            {dataStrapi ? dataStrapi.ServiceHeader.Subtitle : undefined}
          </H6Styling>
        </div>
      </div>

      <div className="container-card-service-prev">
        <Card border={true} variant="squared" classNames="card-service-custom">
          <ServicePreview
            servicePreview={dataStrapi.Service}
            urlLoad={urlLoad}
          />

          <div className="spacing-button-service">
            <Button variant="url" size="large" pathName="/service">
              {dataStrapi ? dataStrapi.ServiceButton.Title : undefined}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ServicesLayout;
