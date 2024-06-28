/* Components strapi types */
type Button = {
  id: number;
  Title: string;
  Link: string;
  Variant: string;
  Color: string | null;
  Size: string;
};

type Header = {
  id: number;
  Title: string;
  Subtitle: string;
};

type ImageAttributes = {
  name: string;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
};

type Image = {
  data: {
    id: number;
    attributes: ImageAttributes;
  };
};

type MosaicoImage = {
  id: number;
  Alt: string;
  Images: {
    data: {
      id: number;
      attributes: ImageAttributes;
    };
  };
};

/* HOME PAGE */
/* strapi home */
type TopSection = {
  Active: boolean;
  id: number;
  FirstButton: Button;
  SecondButton: Button;
  HeroHeader: Header;
};

type Flag = {
  id: number;
  Alt: string;
  Icon: Image;
};

type PrincipalImage = {
  id: number;
  Alt: string;
  Icon: Image;
};

type IndustryImg = {
  id: number;
  Alt: string;
  Images: Image;
};

interface HeroImages {
  id: number;
  FirstFlag: Flag;
  SecondFlag: Flag;
  PrincipalImage: PrincipalImage;
}

type ImageHeroSection = {
  Active: boolean;
  id: number;
  Title: string;
  HeroImages: HeroImages;
  IndustriesImages: IndustryImg[];
};

type HomeSection = {
  topSection: TopSection;
  imageHeroSection: ImageHeroSection;
};

/* strapiService */
type ServiceImage = {
  id: number;
  Alt: string;
  Icon: Image;
};

type Service = {
  id: number;
  Title: string;
  Content: string;
  ServiceImage: ServiceImage;
};

type ServicesSection = {
  Active: boolean;
  id: number;
  ServiceHeader: Header;
  Service: Service[];
  ServiceButton: Button;
};

/* strapiProcess */
type StepImage = {
  id: number;
  Alt: string;
  Icon: Image;
};

type Step = {
  id: number;
  Title: string;
  Content: string;
  StepImage: StepImage;
  StepImageDesktop: StepImage;
};

type BgProcessCurve = {
  id: number;
  Alt: string;
  Icon: Image;
};

type IconUpload = {
  id: number;
  Alt: string;
  Icon: Image;
};

type ProcessSection = {
  Active: boolean;
  id: number;
  ProcessHeader: Header;
  Step: Step[];
  BgProcessCurve: BgProcessCurve;
  IconUpload: IconUpload;
};

/* strapiCarousel */
type ImageTestimonial = {
  id: number;
  Alt: string;
  Icon: Image;
};

type Testimonial = {
  id: number;
  Client: string;
  Title: string;
  Subtitle: string;
  Content: string;
  ImageTestimonial: ImageTestimonial;
};

type CarouselSection = {
  Active: boolean;
  id: number;
  CarouselHeader: Header;
  Testimonial: Testimonial[];
};

/* SERVICES PAGE */
/* Strapi serviceHome */

type ServicePrincipalHeader = {
  id: number;
  Title: string;
  Subtitle: string;
};

/* Strapi Benefit List */
type BenefitImage = {
  id: number;
  Alt: string;
  Icon: Image;
};

type Benefit = {
  id: number;
  Title: string;
  Content: string;
  BenefitImage: BenefitImage;
};

type BenefitMosaicoCard = {
  id: number;
  Title: string;
  Content: string;
  MosaicoImage: MosaicoImage[];
};

type BenefitList = {
  Active: boolean;
  id: number;
  BenefitHeader: Header;
  Benefit: Benefit[];
  BenefitMosaicoCard: BenefitMosaicoCard;
};

/* Strapi Pricing Service */
type PricingImage = {
  id: number;
  Alt: string;
  Icon: Image;
};

type ServicePriceItem = {
  id: number;
  Title: string;
  Price: string;
  Content: string;
  Priority: string;
  PricingIcon: PricingImage;
  ServicePriceButton: Button | null;
};

type PricingService = {
  Active: boolean;
  id: number;
  ServiceHeader: Header;
  ServicePrice: ServicePriceItem[];
};

/* Strapi Language List */
type LanguageItem = {
  id: number;
  Title: string;
  Content: string;
  LanguageFlag: {
    id: number;
    Alt: string;
    Icon: Image;
  };
  LanguagePerson: {
    id: number;
    Alt: string;
    Icon: Image;
  };
};

type LanguageList = {
  Active: boolean;
  id: number;
  LanguageHeader: Header;
  LanguageCard: LanguageItem[];
};

/* Strapi Frequently Question */
type Question = {
  id: number;
  Content: string;
  QuestionButton: Button;
};

type FrequentlyQuestionList = {
  Active: boolean;
  id: number;
  FrequentlyHeader: Header;
  Question: Question[];
};

/* ABOUT PAGE */
/* Strapi About Home Section */
type AboutHomeSection = {
  Active: boolean;
  id: number;
  AboutHomeHeader: Header;
  FirstButton: Button;
  SecondButton: Button;
  AboutHomeMosaico: MosaicoImage[];
};

/* Strapi Purpose Section */
type PurposeImage = {
  id: number;
  Alt: string;
  Icon: Image;
};

type Purpose = {
  id: number;
  Title: string;
  Content: string;
  PurposeImage: PurposeImage;
};

type PurposeSection = {
  Active: boolean;
  id: number;
  Porpuse: Purpose[];
};

/* Strapi Values Section */
type ValueIcon = {
  id: number;
  Alt: string;
  Icon: Image;
};

type ExpertiseIcon = {
  id: number;
  Alt: string;
  Images: Image;
};

type Value = {
  id: number;
  Title: string;
  Content: string;
  ValueIcon: ValueIcon;
};

type ExpertiseCard = {
  id: number;
  Title: string;
  Content: string;
  ExpertiseIcon: ExpertiseIcon[];
};

type ValuesSection = {
  Active: boolean;
  id: number;
  ValuesHeader: Header;
  Value: Value[];
  ExpertiseCard: ExpertiseCard;
};

/* Strapi Founder Section */
type FounderImage = {
  id: number;
  Alt: string;
  Icon: Image;
};

type FounderSection = {
  Active: boolean;
  id: number;
  Title: string;
  Subtitle: string;
  FirstParagraph: string;
  SecondParagraph: string;
  FounderImage: FounderImage;
};
