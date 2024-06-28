import "./style.css";
import { useEffect } from "react";
import { useSwiper } from "swiper/react";

type PrevButtonProps = {
  changeSlide: boolean;
  setChangeSlide: React.Dispatch<React.SetStateAction<boolean>>;
  start: boolean | undefined;
  setStart: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

const PrevButton = ({
  changeSlide,
  setChangeSlide,
  setStart,
  start,
}: PrevButtonProps) => {
  const swiper = useSwiper();

  useEffect(() => {
    setStart(swiper.isBeginning);
  }, [changeSlide]);

  return (
    <button
      className={`prev-style ${start ? "prev-inactive" : ""}`}
      onClick={() => {
        setChangeSlide(!changeSlide);
        swiper.slidePrev();
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

export default PrevButton;
