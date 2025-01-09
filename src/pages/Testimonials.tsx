import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Menggunakan ikon bintang
import { useEffect, useState } from 'react';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const response = await fetch('data.json'); // Ganti dengan path yang sesuai
      const data = await response.json();
      setTestimonials(data);
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Testimonial</h2>
      <div className="grid grid-cols-1 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" />
            <p className="text-gray-300">
              <strong>{testimonial.nama}:</strong> {testimonial.comment}
            </p>
            <div className="ml-2 flex">
              {Array.from({ length: testimonial.jumlahstar }).map((_, starIndex) => (
                <FontAwesomeIcon key={starIndex} icon={faStar} className="text-yellow-400" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
