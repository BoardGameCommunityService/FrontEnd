"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const dragRef = useRef<HTMLUListElement>(null);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setCurrentX(e.pageX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setCurrentX(e.pageX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
      }
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setStartX(0);
      setCurrentX(0);
    }
  };

  useEffect(() => {
    if (isDragging) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [banners.length, isDragging]);

  const dragOffset = isDragging ? startX - currentX : 0;
  const translateX = `calc(${currentIndex * -100}% + ${-dragOffset}px)`;

  return (
    <div className="w-full max-w-[335px] overflow-x-hidden flex flex-col items-center">
      <div className="w-full relative">
        <ul
          ref={dragRef}
          className={`flex select-none transition-transform ${isDragging ? "duration-0" : "duration-500"}`}
          style={{ transform: `translateX(${translateX})` }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {banners.map((banner) => (
            <li className="flex-shrink-0 w-full aspect-[335/100] relative" key={banner.id}>
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                sizes="(max-width: 335px) 100vw, 335px"
                className="object-fill pointer-events-none"
                priority={banner.id === 0}
                draggable={false}
              />
            </li>
          ))}
        </ul>

        <ul className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1">
          {banners.map((banner, idx) => (
            <li key={banner.id}>
              <button
                className={`${currentIndex === idx ? "bg-[#FFFFFF]" : "bg-[#FFFFFF66]"} rounded-[50%] w-1 h-1 cursor-pointer`}
                onClick={() => moveBanner(banner.id)}
              ></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
