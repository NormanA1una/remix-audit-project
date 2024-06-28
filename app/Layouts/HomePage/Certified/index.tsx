import "./style.css";

import HeroImage from "../HeroImage";

const Certified = ({
  dataStrapi,
  urlLoad,
}: {
  dataStrapi: ImageHeroSection | undefined;
  urlLoad: string;
}) => {
  return (
    <div className="certified-container-bg">
      <HeroImage dataStrapi={dataStrapi} urlLoad={urlLoad} />
    </div>
  );
};

export default Certified;
