import "./style.css";

import Card from "~/components/Card";
import H6Styling from "~/components/Typography/H6";
import Title from "~/components/Typography/Title";
import H3Styling from "~/components/Typography/H3";
import H5Styling from "~/components/Typography/H5";
import Button from "~/components/Button";
import { useNavigate } from "@remix-run/react";

const dataServicesPricing = [
  {
    img: {
      src: "/images/technicalTranslationPricing.svg",
      alt: "Technical Translation icon in pricing section",
    },
    title: "Technical Translation",
    price: "$25",
    text: "Technical documents require specialized knowledge. Our technical translation service provides precise translations for complex documents. For just $25 per page, our translators ensure that complex terminology is translated with accuracy.",
    button: "order",
    priority: "normal",
  },
  {
    img: {
      src: "/images/standardTranslationPricing.svg",
      alt: "Standard Translation icon in pricing section",
    },
    title: "Standard Translation",
    price: "$20",
    text: "Accurate and reliable translation of general documents. Trust us to convey your message in its right context. And our competitive fee of only $20 per page makes quality translation affordable for everyone.",
    button: "order",
    priority: "priority",
  },
  {
    img: {
      src: "/images/birthDeathPricing.svg",
      alt: "Birth/Death Certificate icon in pricing section",
    },
    title: "Page Birth or Death Certificate",
    price: "$20",
    text: "Ensure accuracy and validity in your vital records by letting us handle the translation work which is sure to meet the official requirements with utmost care and precision.",
    button: "order",
    priority: "normal",
  },
  {
    img: {
      src: "/images/idPricing.svg",
      alt: "ID icon in pricing section",
    },
    title: "ID",
    price: "$20",
    text: "From driver's licenses to national IDs. With a focus on precision and clarity, our $20 per ID service ensures that your official documents retain their integrity and meaning.",
    button: "order",
    priority: "normal",
  },
  {
    img: {
      src: "/images/diplomaPricing.svg",
      alt: "Diploma icon in pricing section",
    },
    title: "Diploma",
    price: "$15",
    text: "From driver's licenses to national IDs. With a focus on precision and clarity, our $20 per ID service ensures that your official documents retain their integrity and meaning.",
    button: "order",
    priority: "normal",
  },
  {
    img: {
      src: "/images/translationExpeditePricing.svg",
      alt: "Translation expedite icon in pricing section",
    },
    title: "Translation Expedite",
    price: "$10",
    text: "Our expedited translation service delivers fast and reliable translations within 12 to 24 hours. Whether it's an urgent legal document or a time-sensitive business report, get your document delivered on time for just $10 extra per page.",
    button: "expedite",
    priority: "normal",
  },
];

const ServicePricing = ({
  dataStrapi,
  urlLoad,
  lng,
}: {
  dataStrapi: PricingService;
  urlLoad: string;
  lng: string;
}) => {
  const navigate = useNavigate();

  return (
    <div className="div-principal-container-pricing">
      <div className="div-pricing-principal-titles">
        <Title style={{ textAlign: "center", color: "#151718" }}>
          {dataStrapi
            ? dataStrapi.ServiceHeader.Title
            : "Discover our translation offerings"}
        </Title>
        <div
          className={`${lng === "es" ? "pricing-subtitle-spanish" : undefined}`}
        >
          <H6Styling style={{ textAlign: "center", color: "#333333" }}>
            {dataStrapi
              ? dataStrapi.ServiceHeader.Subtitle
              : "Learn more about translation services made just for asylum seekers and law firms that assist clients during the immigration process."}
          </H6Styling>
        </div>
      </div>

      <div className="div-grid-layout-pricing">
        {dataStrapi
          ? dataStrapi.ServicePrice.map((service) => {
              return (
                <Card
                  key={service.id}
                  variant="basic"
                  border={true}
                  shadow="lg"
                  classNames="services-pricing-card"
                >
                  <div
                    className={`div-top-section-card-pricing ${
                      service.Priority === "priority"
                        ? "bg-priority"
                        : "bg-normal"
                    }`}
                  >
                    <img
                      src={`${urlLoad}${service.PricingIcon.Icon.data.attributes.url}`}
                      alt={service.PricingIcon.Alt}
                      className="img-position-icon"
                    />
                    <H5Styling
                      style={{
                        color:
                          service.Priority !== "priority"
                            ? "#101828"
                            : "#D2CFCF",
                        fontWeight: 600,
                      }}
                    >
                      {service.Title}
                    </H5Styling>
                    <div className="div-pricing-spacing">
                      <H3Styling
                        style={{
                          color:
                            service.Priority !== "priority"
                              ? "#101828"
                              : "#FFFFFF",
                        }}
                      >
                        {service.Price}
                      </H3Styling>
                      <H5Styling
                        style={{
                          color:
                            service.Priority !== "priority"
                              ? "#344054"
                              : "#FFFFFF",
                          fontWeight: 500,
                        }}
                      >
                        /Per page
                      </H5Styling>
                    </div>
                    <div className="full-space">
                      <Button
                        variant={`${
                          service.Priority !== "priority"
                            ? "outline"
                            : "contained"
                        }`}
                        color={`${
                          service.Priority !== "priority" ? "dark" : "service"
                        }`}
                        size="small"
                        className={`full-space ${
                          service.ServicePriceButton?.Title === "expedite"
                            ? "invisible"
                            : ""
                        }`}
                        onClick={() => {
                          navigate({
                            hash: "#contact-form-services",
                          });
                        }}
                      >
                        {service.ServicePriceButton?.Title}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <H6Styling style={{ color: "#344054" }}>
                      {service.Content}
                    </H6Styling>
                  </div>
                </Card>
              );
            })
          : dataServicesPricing.map((service) => {
              return (
                <Card
                  key={service.title}
                  variant="basic"
                  border={true}
                  shadow="lg"
                  classNames="services-pricing-card"
                >
                  <div
                    className={`div-top-section-card-pricing ${
                      service.priority === "priority"
                        ? "bg-priority"
                        : "bg-normal"
                    }`}
                  >
                    <img
                      src={service.img.src}
                      alt={service.img.alt}
                      className="img-position-icon"
                    />
                    <H5Styling
                      style={{
                        color:
                          service.priority !== "priority"
                            ? "#101828"
                            : "#D2CFCF",
                        fontWeight: 600,
                      }}
                    >
                      {service.title}
                    </H5Styling>
                    <div className="div-pricing-spacing">
                      <H3Styling
                        style={{
                          color:
                            service.priority !== "priority"
                              ? "#101828"
                              : "#FFFFFF",
                        }}
                      >
                        {service.price}
                      </H3Styling>
                      <H5Styling
                        style={{
                          color:
                            service.priority !== "priority"
                              ? "#344054"
                              : "#FFFFFF",
                          fontWeight: 500,
                        }}
                      >
                        /Per page
                      </H5Styling>
                    </div>
                    <div className="full-space">
                      <Button
                        variant={`${
                          service.priority !== "priority"
                            ? "outline"
                            : "contained"
                        }`}
                        color={`${
                          service.priority !== "priority" ? "dark" : "service"
                        }`}
                        size="small"
                        className={`full-space ${
                          service.button === "expedite" ? "invisible" : ""
                        }`}
                        onClick={() => {
                          navigate({
                            hash: "#contact-form-services",
                          });
                        }}
                      >
                        {service.button}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <H6Styling style={{ color: "#344054" }}>
                      {service.text}
                    </H6Styling>
                  </div>
                </Card>
              );
            })}
      </div>
    </div>
  );
};

export default ServicePricing;
