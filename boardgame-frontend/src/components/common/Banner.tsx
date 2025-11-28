"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const dragRef = useRef<HTMLUListElement>(null);

  const banners = [
    { id: 0, src: "/banners/banner0.svg", alt: "배너1" },
    { id: 1, src: "/banners/banner1.svg", alt: "배너2" },
    { id: 2, src: "/banners/banner2.svg", alt: "배너3" },
    { id: 3, src: "/banners/banner3.svg", alt: "배너4" },
    { id: 4, src: "/banners/banner4.svg", alt: "배너5" },
  ];

  const extendedBanners = [
    { ...banners[banners.length - 1], id: "clone-last" },
    ...banners,
    { ...banners[0], id: "clone-first" },
  ];

  const moveBanner = (index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index + 1);
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
      setIsTransitioning(true);
      if (diff > 0) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setCurrentIndex((prev) => prev - 1);
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
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, [isDragging]);

  useEffect(() => {
    if (!isTransitioning) return;

    const handleTransitionEnd = () => {
      if (currentIndex >= extendedBanners.length - 1) {
        setIsTransitioning(false);
        setCurrentIndex(1);
      } else if (currentIndex <= 0) {
        setIsTransitioning(false);
        setCurrentIndex(banners.length);
      }
    };

    const timer = setTimeout(handleTransitionEnd, 500);
    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning, banners.length, extendedBanners.length]);

  const dragOffset = isDragging ? startX - currentX : 0;
  const translateX = `calc(${currentIndex * -100}% + ${-dragOffset}px)`;

  const getRealIndex = () => {
    if (currentIndex === 0) return banners.length - 1;
    if (currentIndex === extendedBanners.length - 1) return 0;
    return currentIndex - 1;
  };

  return (
    <div className="w-full max-w-[335px] overflow-x-hidden flex flex-col items-center">
      <div className="w-full relative">
        <ul
          ref={dragRef}
          className={`flex select-none touch-none ${isDragging || !isTransitioning ? "duration-0" : "duration-500"} transition-transform`}
          style={{ transform: `translateX(${translateX})` }}
          onPointerDown={handleMouseDown}
          onPointerMove={handleMouseMove}
          onPointerUp={handleMouseUp}
          onPointerLeave={handleMouseLeave}
        >
          {extendedBanners.map((banner, idx) => (
            <li className="flex-shrink-0 w-full aspect-[335/100] relative" key={`${banner.id}-${idx}`}>
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                sizes="(max-width: 335px) 100vw, 335px"
                className="object-fill pointer-events-none"
                priority={idx === 1}
                draggable={false}
              />
            </li>
          ))}
        </ul>

        <ul className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1">
          {banners.map((banner, idx) => (
            <li key={banner.id}>
              <button
                className={`${getRealIndex() === idx ? "bg-[#FFFFFF]" : "bg-[#FFFFFF66]"} rounded-[50%] w-1 h-1 cursor-pointer`}
                onClick={() => moveBanner(idx)}
              ></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
