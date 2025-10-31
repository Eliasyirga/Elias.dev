import React from "react";

const certificateImages = [
  "/pic1.jpg",
  "/pic2.jpg",
  "/pic3.jpg",
  "/pic4.jpg",
  "/pic5.jpg",
  "/pic6.jpg",
];

const Certificates = () => {
  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <h1 className="text-4xl font-bold text-center mb-12 text-blue-400 drop-shadow-lg">
        My Certificates
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {certificateImages.map((src, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-blue-400 shadow-lg hover:scale-105 transform transition-transform duration-300"
          >
            <img
              src={src}
              alt={`Certificate ${index + 1}`}
              className="w-full h-60 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
