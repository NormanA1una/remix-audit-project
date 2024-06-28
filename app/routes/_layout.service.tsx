import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import Benefit from "~/Layouts/ServicePage/Benefit";
import LanguageSection from "~/Layouts/ServicePage/LanguageSection";
import FrequentQuestions from "~/Layouts/ServicePage/Questions";
import ServicePageLayout from "~/Layouts/ServicePage/ServiceHome";
import ServicePricing from "~/Layouts/ServicePage/ServicePricing";

export const loader: LoaderFunction = async ({ request }) => {
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

  const strapiPrincipalHeader: ServicePrincipalHeader =
    dataContext.strapiDataServices
      ? dataContext.strapiDataServices.principalHeader
      : undefined;

  const strapiBenefitList: BenefitList = dataContext.strapiDataServices
    ? dataContext.strapiDataServices.benefitList
    : undefined;

  const strapiPricingList: PricingService = dataContext.strapiDataServices
    ? dataContext.strapiDataServices.pricingService
    : undefined;

  const strapiLanguageList: LanguageList = dataContext.strapiDataServices
    ? dataContext.strapiDataServices.languageList
    : undefined;

  const strapiFrequentlyQuestion: FrequentlyQuestionList =
    dataContext.strapiDataServices
      ? dataContext.strapiDataServices.frequentlyQuestionList
      : undefined;

  return (
    <>
      <ServicePageLayout
        dehydratedState={dehydratedState}
        dataStrapi={strapiPrincipalHeader}
      />

      {strapiBenefitList.Active && (
        <Benefit
          dataStrapi={strapiBenefitList}
          urlLoad={dataContext.urlImages}
        />
      )}

      {strapiPricingList.Active && (
        <ServicePricing
          dataStrapi={strapiPricingList}
          urlLoad={dataContext.urlImages}
          lng={dataContext.lng}
        />
      )}

      {strapiLanguageList.Active && (
        <LanguageSection
          dataStrapi={strapiLanguageList}
          urlLoad={dataContext.urlImages}
        />
      )}

      {strapiFrequentlyQuestion.Active && (
        <FrequentQuestions dataStrapi={strapiFrequentlyQuestion} />
      )}
    </>
  );
}
