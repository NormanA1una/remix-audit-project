import "./style.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { useState } from "react";

import Card from "~/components/Card";
import Paragraph from "~/components/Typography/Paragraph";
import H6Styling from "~/components/Typography/H6";
import H4Styling from "~/components/Typography/H4";
import PrevButton from "./Navigation/Prev";
import NextButton from "./Navigation/Next";

const CarouselContent = ({
  testimonials,
  urlLoad,
}: {
  testimonials: Testimonial[];
  urlLoad: string;
}) => {
  const [changeSlide, setChangeSlide] = useState(true);
  const [start, setStart] = useState<boolean>();
  const [end, setEnd] = useState<boolean>();

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, EffectCoverflow]}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 0,
          stretch: -100,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
          1536: {
            coverflowEffect: {
              rotate: 0,
              stretch: -300,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            },
          },
        }}
        initialSlide={1}
        pagination={{
          clickable: true,
          clickableClass: "swiper-position",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        onSlideChange={(swiper) => {
          setStart(swiper.isBeginning);
          setEnd(swiper.isEnd);
        }}
        className="spacing-swiper"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="spacing-slide">
            <Card
              variant="testimonial"
              border={true}
              classNames="card-testimonial-custom"
            >
              <div className="div-spacing-carousel">
                <div className="div-img-card-carousel">
                  <div>
                    <img
                      src={`${urlLoad}${testimonial.ImageTestimonial.Icon.data.attributes.url}`}
                      alt={testimonial.ImageTestimonial.Alt}
                      className="img-carousel"
                      height={
                        testimonial.ImageTestimonial.Icon.data.attributes.height
                      }
                      width={
                        testimonial.ImageTestimonial.Icon.data.attributes.width
                      }
                    />
                  </div>

                  <Paragraph style={{ fontWeight: 500, textAlign: "center" }}>
                    {testimonial.Client}
                  </Paragraph>
                </div>

                <hr className="hr-styling" />
                <div className="div-separator-style"></div>

                <div className="div-text-card-carousel">
                  <H6Styling style={{ color: "#1C79A0" }}>
                    {testimonial.Title}
                  </H6Styling>
                  <H4Styling>{testimonial.Subtitle}</H4Styling>

                  <Paragraph style={{ lineHeight: "32px" }}>
                    {testimonial.Content}
                  </Paragraph>
                </div>
              </div>
            </Card>
          </SwiperSlide>
        ))}

        <div className="div-spacing-button">
          <PrevButton
            changeSlide={changeSlide}
            setChangeSlide={setChangeSlide}
            setStart={setStart}
            start={start}
          />
          <NextButton
            changeSlide={changeSlide}
            setChangeSlide={setChangeSlide}
            end={end}
            setEnd={setEnd}
          />
        </div>
      </Swiper>
    </>
  );
};

export default CarouselContent;
