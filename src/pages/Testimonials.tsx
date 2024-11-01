import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Menggunakan ikon bintang

export const Testimonials = () => {
  const testimonials = [
    "Andrian: Sangat puas dengan layanan yang diberikan, profesional dan responsif.",
    "Deva Widnyana: Pengalaman yang luar biasa, selalu siap membantu.",
    "Surya Imanuel: Kualitas kerja yang sangat baik, tidak mengecewakan!",
    "Wawan Setiawan: Terima kasih atas kerja sama yang baik.",
    "Agas: Sangat merekomendasikan, hasilnya memuaskan.",
    "Gopal: Layanan cepat dan hasil memuaskan, sangat recommended!",
  ];


  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Testimonial</h2>
      <div className="grid grid-cols-1 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" /> {/* Ikon bintang */}
            <p className="text-gray-300">{testimonial}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
