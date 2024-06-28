import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import qs from "qs";

import IndexLayout from "~/Layouts/Main/index";
import i18nServer from "~/modules/i18n.server";

const homePageQuery = qs.stringify({
  populate: {
    HomeContent: {
      on: {
        "component.two-button-cta": {
          populate: "*",
        },
        "component.mosaico-hero": {
          populate: {
            HeroImages: {
              populate: {
                FirstFlag: {
                  populate: "*",
                },
                SecondFlag: {
                  populate: "*",
                },
                PrincipalImage: {
                  populate: "*",
                },
              },
            },
            IndustriesImages: {
              populate: "*",
            },
          },
        },
        "component.service-list": {
          populate: {
            ServiceHeader: {
              populate: "*",
            },
            Service: {
              populate: {
                ServiceImage: {
                  populate: "*",
                },
              },
            },
            ServiceButton: {
              populate: "*",
            },
          },
        },
        "component.process-list": {
          populate: {
            ProcessHeader: {
              populate: "*",
            },
            Step: {
              populate: {
                StepImage: {
                  populate: "*",
                },
                StepImageDesktop: {
                  populate: "*",
                },
              },
            },
            BgProcessCurve: {
              populate: "*",
            },
            IconUpload: {
              populate: "*",
            },
          },
        },
        "component.carousel": {
          populate: {
            CarouselHeader: {
              populate: "*",
            },
            Testimonial: {
              populate: {
                ImageTestimonial: {
                  populate: "*",
                },
              },
            },
          },
        },
      },
    },
  },
});

const servicesPageQuery = qs.stringify({
  populate: {
    ServiceContent: {
      on: {
        "component.header": {
          populate: "*",
        },
        "component.benefit-list": {
          populate: {
            BenefitHeader: {
              populate: "*",
            },
            Benefit: {
              populate: {
                BenefitImage: {
                  populate: "*",
                },
              },
            },
            BenefitMosaicoCard: {
              populate: {
                MosaicoImage: {
                  populate: "*",
                },
              },
            },
          },
        },
        "component.pricing-service": {
          populate: {
            ServiceHeader: {
              populate: "*",
            },
            ServicePrice: {
              populate: {
                PricingIcon: {
                  populate: "*",
                },
                ServicePriceButton: {
                  populate: "*",
                },
              },
            },
          },
        },
        "component.language-list": {
          populate: {
            LanguageHeader: {
              populate: "*",
            },
            LanguageCard: {
              populate: {
                LanguageFlag: {
                  populate: "*",
                },
                LanguagePerson: {
                  populate: "*",
                },
              },
            },
          },
        },
        "component.frequently-question-list": {
          populate: {
            FrequentlyHeader: {
              populate: "*",
            },
            Question: {
              populate: "*",
            },
          },
        },
      },
    },
  },
});

const aboutPageQuery = qs.stringify({
  populate: {
    AboutContent: {
      on: {
        "component.about-home-section": {
          populate: {
            AboutHomeHeader: {
              populate: "*",
            },
            FirstButton: {
              populate: "*",
            },
            SecondButton: {
              populate: "*",
            },
            AboutHomeMosaico: {
              populate: "*",
            },
          },
        },
        "component.purpose-section": {
          populate: {
            Porpuse: {
              populate: {
                PurposeImage: {
                  populate: "*",
                },
              },
            },
          },
        },
        "component.values-section": {
          populate: {
            ValuesHeader: {
              populate: "*",
            },
            Value: {
              populate: {
                ValueIcon: {
                  populate: "*",
                },
              },
            },
            ExpertiseCard: {
              populate: {
                ExpertiseIcon: {
                  populate: "*",
                },
              },
            },
          },
        },
        "component.founder-section": {
          populate: {
            FounderImage: {
              populate: "*",
            },
          },
        },
      },
    },
  },
});

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await i18nServer.getLocale(request);

  const pathNames = [
    { name: "Home", nameSpanish: "Inicio", pathName: "/" },
    { name: "Service", nameSpanish: "Servicios", pathName: "/service" },
    { name: "About", nameSpanish: "Sobre Nosotros", pathName: "/about" },
  ];

  const urlHome = `${process.env.URL_FETCH}/api/home-page`;
  const urlHomeSearch = `${urlHome}?locale=${locale}&${homePageQuery}`;

  const urlServices = `${process.env.URL_FETCH}/api/service-page`;
  const urlServicesSearch = `${urlServices}?locale=${locale}&${servicesPageQuery}`;

  const urlAbout = `${process.env.URL_FETCH}/api/about-page`;
  const urlAboutSearch = `${urlAbout}?locale=${locale}&${aboutPageQuery}`;

  let strapiHome;
  let strapiServices;
  let strapiAbout;
  try {
    const responseHome = await fetch(urlHomeSearch);
    const responseServices = await fetch(urlServicesSearch);
    const responseAbout = await fetch(urlAboutSearch);

    if (!responseHome.ok) {
      throw new Error(`HTTP error! status: ${responseHome.status}`);
    }

    if (!responseServices.ok) {
      throw new Error(`HTTP error! status: ${responseServices.status}`);
    }

    if (!responseAbout.ok) {
      throw new Error(`HTTP error! status: ${responseAbout.status}`);
    }

    strapiHome = await responseHome.json();
    strapiServices = await responseServices.json();
    strapiAbout = await responseAbout.json();
  } catch (e) {
    console.error("Failed to fetch data from Strapi:", e);
    return json({ pathNames: pathNames, locale: locale });
  }

  if (!strapiHome.data?.attributes?.HomeContent) {
    return json({ pathNames: pathNames, locale: locale });
  }

  if (!strapiServices.data?.attributes?.ServiceContent) {
    return json({ pathNames: pathNames, locale: locale });
  }

  if (!strapiAbout.data?.attributes?.AboutContent) {
    return json({ pathNames: pathNames, locale: locale });
  }

  return json({
    pathNames: pathNames,
    locale: locale,
    urlImages: process.env.URL_FETCH,
    strapiDataHome: {
      homeSection: {
        topSection: strapiHome.data.attributes.HomeContent[0],
        imageHeroSection: strapiHome.data.attributes.HomeContent[1],
      },
      servicesSection: strapiHome.data.attributes.HomeContent[2],
      processSection: strapiHome.data.attributes.HomeContent[3],
      carouselSection: strapiHome.data.attributes.HomeContent[4],
    },
    strapiDataServices: {
      principalHeader: strapiServices.data?.attributes?.ServiceContent[0],
      benefitList: strapiServices.data?.attributes?.ServiceContent[1],
      pricingService: strapiServices.data?.attributes?.ServiceContent[2],
      languageList: strapiServices.data?.attributes?.ServiceContent[3],
      frequentlyQuestionList:
        strapiServices.data?.attributes?.ServiceContent[4],
    },
    strapiDataAbout: {
      aboutHomeSection: strapiAbout.data?.attributes?.AboutContent[0],
      purposeSection: strapiAbout.data?.attributes?.AboutContent[1],
      valuesSection: strapiAbout.data?.attributes?.AboutContent[2],
      founderSection: strapiAbout.data?.attributes?.AboutContent[3],
    },
  });
};

export default function MainLayout() {
  const {
    pathNames,
    locale,
    urlImages,
    strapiDataHome,
    strapiDataServices,
    strapiDataAbout,
  } = useLoaderData<typeof loader>();

  return (
    <>
      <IndexLayout
        pathNames={pathNames}
        lng={locale}
        urlImages={urlImages}
        strapiDataHome={strapiDataHome}
        strapiDataServices={strapiDataServices}
        strapiDataAbout={strapiDataAbout}
      />
    </>
  );
}
