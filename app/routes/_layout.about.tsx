import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import AboutPageLayout from "~/Layouts/AboutPage/AboutHome";
import ContactAbout from "~/Layouts/AboutPage/ContactAbout";
import Founder from "~/Layouts/AboutPage/Founder";
import Purpose from "~/Layouts/AboutPage/Purpose";
import Values from "~/Layouts/AboutPage/Values";

export const loader: LoaderFunction = async ({}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["countryClient"],
    queryFn: () => fetch(`https://ipapi.co/country/`).then((res) => res.text()),
  });

  return json({ dehydratedState: dehydrate(queryClient) });
};

export default function ServicePage() {
  const dataContext: any = useOutletContext();
  const { dehydratedState } = useLoaderData<typeof loader>();

  const strapiAboutHomeSection: AboutHomeSection = dataContext.strapiDataAbout
    ? dataContext.strapiDataAbout.aboutHomeSection
    : undefined;

  const strapiPurposeSection: PurposeSection = dataContext.strapiDataAbout
    ? dataContext.strapiDataAbout.purposeSection
    : undefined;

  const strapiValuesSection: ValuesSection = dataContext.strapiDataAbout
    ? dataContext.strapiDataAbout.valuesSection
    : undefined;

  const strapiFounderSection: FounderSection = dataContext.strapiDataAbout
    ? dataContext.strapiDataAbout.founderSection
    : undefined;

  return (
    <>
      {strapiAboutHomeSection.Active && (
        <AboutPageLayout
          dataStrapi={strapiAboutHomeSection}
          urlLoad={dataContext.urlImages}
        />
      )}

      {strapiPurposeSection.Active && (
        <Purpose
          dataStrapi={strapiPurposeSection}
          urlLoad={dataContext.urlImages}
        />
      )}

      {strapiValuesSection.Active && (
        <Values
          dataStrapi={strapiValuesSection}
          urlLoad={dataContext.urlImages}
        />
      )}

      {strapiFounderSection.Active && (
        <Founder
          dataStrapi={strapiFounderSection}
          urlLoad={dataContext.urlImages}
        />
      )}

      <HydrationBoundary state={dehydratedState}>
        <ContactAbout />
      </HydrationBoundary>
    </>
  );
}
