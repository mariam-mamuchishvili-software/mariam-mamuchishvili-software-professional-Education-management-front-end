import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import type { Swiper as SwiperType } from "swiper";
import type { SwiperOptions } from "swiper/types";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

interface CardCarouselProps {
  children: ReactNode[];
  /** Auto-advance every `autoplayDelay` ms, pausing while hovered. */
  autoplay?: boolean;
  autoplayDelay?: number;
  /** Show more cards per view on wide screens (for full-width containers). */
  fullWidth?: boolean;
}

export function CardCarousel({
  children,
  autoplay = false,
  autoplayDelay = 3500,
  fullWidth = false,
}: CardCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const breakpoints: SwiperOptions["breakpoints"] = {
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
  };
  if (fullWidth) breakpoints[1440] = { slidesPerView: 4, spaceBetween: 24 };

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={20}
        slidesPerView={1.1}
        breakpoints={breakpoints}
        autoplay={
          autoplay && {
            delay: autoplayDelay,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }
        }
        rewind={autoplay}
        className="!px-1 !py-1"
      >
        {children.map((child, index) => (
          <SwiperSlide key={index} className="!h-auto pb-1">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="წინა სლაიდი"
        className="absolute top-1/2 -left-4 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-card transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:shadow-none dark:hover:bg-slate-700 lg:flex"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="შემდეგი სლაიდი"
        className="absolute top-1/2 -right-4 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-card transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:shadow-none dark:hover:bg-slate-700 lg:flex"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}
