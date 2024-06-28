import "./style.css";

import { HydrationBoundary } from "@tanstack/react-query";

import Hero from "~/components/Typography/Hero";
import H5Styling from "~/components/Typography/H5";
import ContactServices from "../ContactService";

type ServicePageLayoutProps = {
  dehydratedState: any;
  dataStrapi: ServicePrincipalHeader;
};

const ServicePageLayout = ({
  dehydratedState,
  dataStrapi,
}: ServicePageLayoutProps) => {
  return (
    <div className="service-home-style">
      <div id="contact-form-services" className="container-service-home">
        <Hero
          className="principal-title-2xl"
          style={{
            textAlign: "center",
            color: "#012F5B",
            marginBottom: "22px",
          }}
        >
          {dataStrapi
            ? dataStrapi.Title
            : "Translation services for immigration and law firms"}
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
              ? dataStrapi.Title
              : "We specialize in translations for law firms and asylum seekers. Let us know your needs and we’ll tailor our services, no matter how many pages or how complex. Get a quote now!"}
          </H5Styling>
        </div>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <ContactServices />
      </HydrationBoundary>
    </div>
  );
};

export default ServicePageLayout;
