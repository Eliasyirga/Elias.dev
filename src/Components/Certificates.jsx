import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const certificateImages = [
  "/pic1.jpg",
  "/pic2.jpg",
  "/pic3.jpg",
  "/pic4.jpg",
  "/pic5.jpg",
  "/pic6.jpg",
];

const Certificates = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.offsetWidth;
    // Scroll dynamically by screen width
    let scrollWidth = width;
    if (window.innerWidth >= 1024) scrollWidth = width / 3;
    else if (window.innerWidth >= 640) scrollWidth = width / 2;

    const scrollAmount =
      direction === "left"
        ? carouselRef.current.scrollLeft - scrollWidth
        : carouselRef.current.scrollLeft + scrollWidth;

    carouselRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="min-h-screen bg-black text-white py-10 relative overflow-hidden">
      {/* Title */}
      <h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-16
        bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600
        drop-shadow-xl animate-gradient-x"
      >
        My Certificates
      </h1>

      {/* Carousel Container */}
      <div className="relative w-full">
        {/* Left Arrow */}
        <motion.button
          onClick={() => scroll("left")}
          whileHover={{ scale: 1.15 }}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 
            bg-gradient-to-r from-blue-800/60 to-cyan-700/60
            hover:from-blue-600 hover:to-cyan-600 
            p-3 sm:p-5 rounded-full backdrop-blur-md 
            border border-blue-400/40 shadow-lg active:scale-95 transition"
        >
          &#10094;
        </motion.button>

        {/* Certificates Scroll Area */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-scroll scrollbar-hide scroll-smooth px-4 sm:px-12"
        >
          {certificateImages.map((src, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 cursor-pointer relative rounded-3xl
                bg-gradient-to-tr from-blue-900/40 to-cyan-900/40 backdrop-blur-xl shadow-2xl
                border border-blue-500/30 hover:border-blue-400 transition-all duration-500"
              onClick={() => setSelectedImage(src)}
            >
              <div className="relative overflow-hidden rounded-3xl p-4">
                <img
                  src={src}
                  alt={`Certificate ${index + 1}`}
                  className="w-full h-80 object-contain rounded-2xl shadow-inner shadow-blue-600/50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 rounded-2xl pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        <motion.button
          onClick={() => scroll("right")}
          whileHover={{ scale: 1.15 }}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 
            bg-gradient-to-l from-blue-800/60 to-cyan-700/60
            hover:from-blue-600 hover:to-cyan-600 
            p-3 sm:p-5 rounded-full backdrop-blur-md 
            border border-blue-400/40 shadow-lg active:scale-95 transition"
        >
          &#10095;
        </motion.button>
      </div>

      {/* Modal for Viewing Certificate */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-6 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selectedImage}
              alt="Selected Certificate"
              className="max-h-[90%] max-w-[90%] rounded-3xl border border-blue-400 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <button
              className="absolute top-6 right-6 text-white text-4xl font-bold hover:text-blue-400 transition"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Glow Accents */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
    </section>
  );
};

export default Certificates;
