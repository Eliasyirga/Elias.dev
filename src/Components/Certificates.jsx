import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";

const certificates = [
  { id: 6, src: "/Image (5).jpg.jpeg", title: "Professional Certification" },
  { id: 1, src: "/pic1.jpg", title: "Basic Web Developemnt" },
  { id: 2, src: "/pic2.jpg", title: "React Course" },
  { id: 3, src: "/55.png", title: "Cursor AI Hackaton" },
  { id: 4, src: "/pic3.jpg", title: "Python Programming" },
  { id: 5, src: "/pic4.jpg", title: "Version Control" },

];

const ImageGallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section className="bg-white py-20 px-6 min-h-screen font-[Poppins]">
      <div className="max-w-7xl mx-auto">
        {/* Minimalist Heading */}
        <div className="mb-16 border-l-4 border-black pl-6">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black leading-none">
            Credentials.
          </h2>
        </div>

        {/* Pure Image Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              layoutId={`img-${cert.id}`}
              onClick={() => setSelectedImg(cert)}
              className="relative group cursor-none overflow-hidden border border-black/5 rounded-sm"
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={cert.src}
                alt={cert.title}
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
              />

              {/* Subtle Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-4 bg-white rounded-full text-black">
                  <Maximize2 size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Large Image Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            {/* Close UI */}
            <div className="absolute top-8 right-8 flex items-center gap-4 text-black">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] hidden md:block">
                {selectedImg.title}
              </span>
              <X size={32} strokeWidth={3} />
            </div>

            <motion.img
              layoutId={`img-${selectedImg.id}`}
              src={selectedImg.src}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] grayscale-0"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ImageGallery;
