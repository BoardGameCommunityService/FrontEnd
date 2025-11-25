"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    { id: 0, src: "/banners/banner0.svg", alt: "배너1" },
    { id: 1, src: "/banners/banner1.svg", alt: "배너2" },
    { id: 2, src: "/banners/banner2.svg", alt: "배너3" },
    { id: 3, src: "/banners/banner3.svg", alt: "배너4" },
    { id: 4, src: "/banners/banner4.svg", alt: "배너5" },
  ];

  const moveBanner = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [banners.length, currentIndex]);

  return (
    <div className="w-full max-w-[335px] overflow-x-hidden flex flex-col items-center">
      <div className="w-full relative">
        <ul
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(${currentIndex * -100}%)` }}
        >
          {banners.map((banner) => (
            <li className="flex-shrink-0 w-full aspect-[335/100] relative" key={banner.id}>
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                sizes="(max-width: 335px) 100vw, 335px"
                className="object-fill"
                priority={banner.id === 0}
              />
            </li>
          ))}
        </ul>

        <ul className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1">
          {banners.map((banner, idx) => (
            <li key={banner.id}>
              <button
                className={`${currentIndex === idx ? "bg-[#FFFFFF]" : "bg-[#FFFFFF66]"} rounded-[50%] w-1 h-1`}
                onClick={() => moveBanner(banner.id)}
              ></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
