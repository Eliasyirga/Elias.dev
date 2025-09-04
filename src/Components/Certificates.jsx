import React, { useState, useRef, useEffect } from "react";

const Certificates = () => {
  const certificateImages = [
    "/pic1.jpg",
    "/pic2.jpg",
    "/pic3.jpg",
    "/pic4.jpg",
    "/pic5.jpg",
    "/pic6.jpg",
  ];

  const scrollContainerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalDots = 4;

  // Update card width on resize
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const firstCard = container.querySelector(".cert-card");
    if (firstCard) setCardWidth(firstCard.offsetWidth + 24);

    const handleResize = () => {
      if (firstCard) setCardWidth(firstCard.offsetWidth + 24);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToImage = (index) => {
    if (!scrollContainerRef.current || cardWidth === 0) return;

    scrollContainerRef.current.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });

    setCurrentSlide(index);
  };

  // Auto-scroll one image at a time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextIndex = (prev + 1) % certificateImages.length;
        scrollToImage(nextIndex);
        return nextIndex;
      });
    }, 4000); // 4 seconds per image

    return () => clearInterval(interval);
  }, [cardWidth]);

  const imagesPerDot = Math.ceil(certificateImages.length / totalDots);

  return (
    <section className="w-full mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-20 bg-gradient-to-br from-black via-gray-900 to-black">
      <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400 mb-8 md:mb-12 text-center drop-shadow-lg">
        Certifications
      </h4>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-1 sm:px-3"
      >
        {certificateImages.map((img, idx) => (
          <div
            key={idx}
            className="cert-card snap-center flex-shrink-0
              w-[80vw] sm:w-[45vw] md:w-[30vw] h-64 sm:h-72 md:h-80
              rounded-2xl border-2 border-blue-500 shadow-lg
              overflow-hidden relative bg-gradient-to-tr from-blue-900 via-blue-800 to-black"
          >
            <img
              src={img}
              alt={`Certificate ${idx + 1}`}
              className="w-full h-full object-cover object-center transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 md:mt-8 space-x-3 sm:space-x-4">
        {Array.from({ length: totalDots }).map((_, idx) => {
          const start = idx * imagesPerDot;
          const isActive =
            currentSlide >= start && currentSlide < start + imagesPerDot;
          return (
            <button
              key={idx}
              onClick={() => scrollToImage(start)}
              className={`w-3 sm:w-4 h-3 sm:h-4 rounded-full border-2 border-blue-400
                ${isActive ? "bg-blue-400" : "bg-transparent"}
                transition-all duration-300`}
            />
          );
        })}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Certificates;
