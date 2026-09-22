import { Fancybox } from "@fancyapps/ui/dist/fancybox/fancybox.js";
import { ZoomIn } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Slide } from "../../types/slide.types";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./GallerySlider.css";

interface GallerySliderProps {
  slides: Slide[];
}

const FANCYBOX_SELECTOR = '[data-fancybox="college-gallery"]';

export function GallerySlider({ slides }: GallerySliderProps) {
  const images = useMemo(() => slides.filter((slide) => Boolean(slide.image)), [slides]);

  useEffect(() => {
    if (images.length === 0) return;

    Fancybox.bind(FANCYBOX_SELECTOR, {
      groupAll: true,
    });

    return () => {
      Fancybox.destroy();
    };
  }, [images]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="gallery-slider rounded-2xl border border-slate-200 bg-white p-2 shadow-card dark:border-slate-800 dark:bg-slate-900">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="gallery-slider__swiper"
      >
        {images.map((slide) => (
          <SwiperSlide key={slide.id}>
            <a href={slide.image!} data-fancybox="college-gallery" className="gallery-slider__link">
              <img src={slide.image!} alt={slide.title} className="gallery-slider__image" loading="lazy" />
              <span className="gallery-slider__zoom" aria-hidden="true">
                <ZoomIn className="size-5" />
              </span>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
