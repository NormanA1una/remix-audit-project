import { Outlet, useLocation } from "@remix-run/react";
import Navbar from "~/Layouts/Navbar";
import Footer from "../Footer";

type LayoutProps = {
  pathNames: {
    name: string;
    nameSpanish: string;
    pathName: string;
  }[];
  lng: string;
  urlImages: string;
  strapiDataHome: any;
  strapiDataServices: any;
  strapiDataAbout: any;
};

export default function IndexLayout({
  pathNames,
  lng,
  urlImages,
  strapiDataHome,
  strapiDataServices,
  strapiDataAbout,
}: LayoutProps) {
  const location = useLocation();

  return (
    <>
      <Navbar pathNames={pathNames} lng={lng} currentPath={location.pathname} />
      <Outlet
        context={{
          lng: lng,
          urlImages: urlImages,
          currentPath: location.pathname,
          strapiDataHome: strapiDataHome,
          strapiDataServices: strapiDataServices,
          strapiDataAbout: strapiDataAbout,
        }}
      />
      <Footer pathNames={pathNames} lng={lng} />
    </>
  );
}
