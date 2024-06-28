import "./style.css";
import ServiceContent from "./Content";

const ServicePreview = ({
  servicePreview,
  urlLoad,
}: {
  servicePreview: Service[] | undefined;
  urlLoad: string;
}) => {
  return (
    <div className="service-grid-container">
      {servicePreview
        ? servicePreview.map((service) => (
            <ServiceContent
              height={service.ServiceImage.Icon.data.attributes.height}
              width={service.ServiceImage.Icon.data.attributes.width}
              key={service.id}
              iconUrl={service.ServiceImage.Icon.data.attributes.url}
              alt={service.ServiceImage.Alt}
              title={service.Title}
              text={service.Content}
              urlLoad={urlLoad}
            />
          ))
        : undefined}
    </div>
  );
};

export default ServicePreview;
