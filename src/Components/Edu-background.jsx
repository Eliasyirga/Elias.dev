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

  const totalSlides = Math.ceil(certificateImages.length / itemsPerSlide);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth < 640) setItemsPerSlide(1);
      else if (window.innerWidth < 1024) setItemsPerSlide(2);
      else setItemsPerSlide(3);
      setCurrentSlide(0);
      if (scrollContainerRef.current)
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    };
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const scrollToSlide = (index) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.querySelector(".cert-card");
      if (!card) return;

      const gap = 24; // gap-6 = 1.5rem = 24px
      const cardWidth = card.offsetWidth + gap;

      container.scrollTo({
        left: index * cardWidth * itemsPerSlide,
        behavior: "smooth",
      });
      setCurrentSlide(index);
    }
  };

  return (
    <>
      {/* Background Section */}
      <div
        className="relative bg-fixed bg-center bg-cover px-4 md:px-0"
        style={{ backgroundImage: "url('/back5.webp')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90 z-0 pointer-events-none" />

        <section className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <motion.h3
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-extrabold mb-16 text-center
            bg-gradient-to-r from-blue-400 to-cyan-400 via-purple-500 bg-clip-text text-transparent drop-shadow-xl pt-12"
          >
            Academics & Experience
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
            {educationData.map(({ title, years, description }, i) => (
              <motion.div
                key={i}
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 20px 40px rgb(59 130 246 / 0.85)",
                }}
                transition={{ type: "spring", stiffness: 280 }}
                className="bg-gradient-to-br from-blue-900/90 via-black/95 to-black/95 border border-blue-700 rounded-3xl p-7 shadow-2xl backdrop-blur-md text-gray-200 cursor-pointer flex flex-col transform transition-transform duration-500"
              >
                <div className="flex items-center gap-4 mb-5">
                  <GraduationCap className="text-blue-400 w-9 h-9 md:w-10 md:h-10" />
                  <h4 className="text-xl md:text-2xl font-semibold text-blue-300">
                    {title}
                  </h4>
                </div>
                <p className="italic text-blue-400 text-sm md:text-base mb-5">
                  {years}
                </p>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed flex-grow">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileHover={{
              scale: 1.06,
              boxShadow: "0 20px 45px rgb(59 130 246 / 0.9)",
            }}
            transition={{ type: "spring", stiffness: 260 }}
            className="bg-gradient-to-br from-blue-900/95 to-black/95 border border-blue-700 rounded-3xl p-10 md:p-12 shadow-2xl backdrop-blur-md cursor-pointer"
          >
            <div className="flex items-center gap-5 mb-10">
              <Briefcase className="text-blue-400 w-9 h-9 md:w-10 md:h-10" />
              <h4 className="text-2xl md:text-3xl font-bold text-blue-300">
                Experience
              </h4>
            </div>
            <ul className="list-disc list-inside space-y-5 text-gray-300 text-base md:text-lg leading-relaxed">
              {experiencePoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </motion.div>
        </section>
      </div>

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
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-3"
          style={{ scrollPaddingLeft: "0.5rem" }}
        >
          {certificateImages.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 0 25px rgb(59 130 246 / 0.9)",
                zIndex: 10,
              }}
              whileTap={{ scale: 0.95 }}
              className="cert-card snap-center flex-shrink-0
                w-full
                sm:w-[calc(50vw_-_1.5rem)]
                md:w-[calc(33.333vw_-_1.5rem)]
                h-72 rounded-2xl border-4 border-blue-600 shadow-2xl overflow-hidden relative bg-gradient-to-br from-blue-900 to-black"
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

        <div className="flex justify-center mt-10 space-x-4 md:space-x-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
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
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default EducationExperience;
