import "./style.css";
import { useEffect } from "react";
import { useSwiper } from "swiper/react";

type NextButtonProps = {
  changeSlide: boolean;
  setChangeSlide: React.Dispatch<React.SetStateAction<boolean>>;
  end: boolean | undefined;
  setEnd: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

const NextButton = ({
  changeSlide,
  setChangeSlide,
  end,
  setEnd,
}: NextButtonProps) => {
  const swiper = useSwiper();

  useEffect(() => {
    setEnd(swiper.isEnd);
  }, [changeSlide]);

  return (
    <button
      className={`next-style ${end ? "next-inactive" : ""}`}
      onClick={() => {
        setChangeSlide(!changeSlide);
        swiper.slideNext();
      }}
    >
      <img
        src="/images/arrowCarousel.svg"
        alt="Arrow lineless in carousel"
        height={12}
        width={7}
      />
    </button>
  );
};

export default NextButton;
