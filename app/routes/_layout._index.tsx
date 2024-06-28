import HomeLayout from "~/Layouts/HomePage/Home";
import ServicesLayout from "~/Layouts/HomePage/Services";
import ProcessLayout from "~/Layouts/HomePage/Process";
import CarouselLayout from "~/Layouts/HomePage/Carousel";
import Contact from "~/Layouts/HomePage/Contact";

import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Certified from "~/Layouts/HomePage/Certified";

export const loader: LoaderFunction = async ({}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["countryClient"],
    queryFn: () => fetch(`https://ipapi.co/country/`).then((res) => res.text()),
  });

  return json({
    dehydratedState: dehydrate(queryClient),
  });
};

export default function HomePage() {
  const dataContext: any = useOutletContext();
  const { dehydratedState } = useLoaderData<typeof loader>();

  const strapiHomeData: HomeSection = dataContext.strapiDataHome
    ? dataContext.strapiDataHome.homeSection
    : undefined;

  const strapiServicesData: ServicesSection = dataContext.strapiDataHome
    ? dataContext.strapiDataHome.servicesSection
    : undefined;

  const strapiProcessData: ProcessSection = dataContext.strapiDataHome
    ? dataContext.strapiDataHome.processSection
    : undefined;

  const strapiCarouselData: CarouselSection = dataContext.strapiDataHome
    ? dataContext.strapiDataHome.carouselSection
    : undefined;

  return (
    <>
      {strapiHomeData.topSection.Active && (
        <HomeLayout
          dataStrapi={strapiHomeData ? strapiHomeData.topSection : undefined}
          lng={dataContext.lng}
        />
      )}

      {strapiHomeData.imageHeroSection.Active && (
        <Certified
          urlLoad={dataContext.urlImages}
          dataStrapi={
            strapiHomeData ? strapiHomeData.imageHeroSection : undefined
          }
        />
      )}

      {strapiServicesData.Active && (
        <ServicesLayout
          dataStrapi={strapiServicesData}
          urlLoad={dataContext.urlImages}
        />
      )}

      {strapiProcessData.Active && (
        <ProcessLayout
          dataStrapi={strapiProcessData}
          urlLoad={dataContext.urlImages}
          lng={dataContext.lng}
        />
      )}

      {strapiCarouselData.Active && (
        <CarouselLayout
          dataStrapi={strapiCarouselData}
          urlLoad={dataContext.urlImages}
          lng={dataContext.lng}
        />
      )}

      {
        <HydrationBoundary state={dehydratedState}>
          <Contact lng={dataContext.lng} />
        </HydrationBoundary>
      }
    </>
  );
}
