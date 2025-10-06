import React, { useState, useRef, useEffect } from "react";
import { GraduationCap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const educationData = [
  {
    title: "Bure Yohanes Primary School",
    years: "2010 – 2017",
    description:
      "Completed primary education with a strong foundation in core subjects.",
  },
  {
    title: "Ras Bit-Woded Atikem Mengesh High School",
    years: "2018 – 2021",
    description: "Completed secondary education, preparing for higher studies.",
  },
  {
    title: "Bahirdar University",
    years: "2022 – Present",
    description:
      "Currently pursuing higher education with a focus on computer Engineering and software development.",
  },
];

const experiencePoints = [
  "Participated in various college projects, developing practical skills in software development and teamwork.",
  "Completed an internship program at Alyah Software, building full-stack projects using the MERN stack.",
  "Equipped with strong technical skills and hands-on practice in modern web technologies.",
];

const certificateImages = [
  "/pic1.jpg",
  "/pic2.jpg",
  "/pic3.jpg",
  "/pic4.jpg",
  "/pic5.jpg",
  "/pic6.jpg",
];

const EducationExperience = () => {
  const [itemsPerSlide, setItemsPerSlide] = useState(3);
  const scrollContainerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dynamically set items per slide based on screen width
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) setItemsPerSlide(1);
      else if (window.innerWidth < 1024) setItemsPerSlide(2);
      else setItemsPerSlide(3);
    };
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const totalSlides = Math.ceil(certificateImages.length / itemsPerSlide);

  // Scroll to specific slide
  const scrollToSlide = (index) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.querySelector(".cert-card");
    if (!card) return;

    const gap = parseInt(getComputedStyle(card).marginRight) || 24;
    const cardWidth = card.offsetWidth + gap;

    container.scrollTo({
      left: index * cardWidth * itemsPerSlide,
      behavior: "smooth",
    });
  };

  // Update active dot on scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.querySelector(".cert-card");
    if (!card) return;

    const gap = parseInt(getComputedStyle(card).marginRight) || 24;
    const cardWidth = card.offsetWidth + gap;

    const scrollLeft = container.scrollLeft;
    const slideIndex = Math.round(scrollLeft / (cardWidth * itemsPerSlide));

    if (slideIndex !== currentSlide) setCurrentSlide(slideIndex);
  };

  return (
    <>
      {/* Certificates Section */}
      <section className="w-full mx-auto px-4 md:px-0 py-20 bg-black">
        <motion.h4
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-2xl md:text-3xl font-bold text-blue-400 mb-12 text-center drop-shadow-lg"
        >
          Certifications
        </motion.h4>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-3"
        >
          {certificateImages.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 0 35px rgb(59 130 246 / 0.9)",
                zIndex: 10,
              }}
              whileTap={{ scale: 0.95 }}
              className="cert-card snap-center flex-shrink-0
                w-full
                sm:w-[calc(50vw_-_1.5rem)]
                md:w-[calc(33.333vw_-_1.5rem)]
                h-72 rounded-2xl border-4 border-dotted border-blue-500 shadow-2xl overflow-hidden relative bg-gradient-to-br from-blue-900 to-black"
            >
              <img
                src={img}
                alt={`Certificate ${idx + 1}`}
                className="w-full h-full object-cover object-center filter brightness-90 hover:brightness-110 transition duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6 rounded-2xl">
                <p className="text-white font-semibold text-lg select-none pointer-events-none">
                  Certificate {idx + 1}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-10 space-x-4 md:space-x-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => scrollToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`w-5 h-5 rounded-full border-2 border-blue-500
                ${
                  currentSlide === index
                    ? "bg-blue-500 scale-110 shadow-lg"
                    : "bg-transparent hover:bg-blue-600"
                }
                transition duration-300`}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default EducationExperience;
