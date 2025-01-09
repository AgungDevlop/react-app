import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Menggunakan ikon bintang
import axios from 'axios';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get('https://andre.mediafolder.my.id/Star.json')
      .then((response) => setTestimonials(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-white mb-8">Customer Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2 text-2xl" />
              <span className="text-xl font-semibold">{testimonial.nama}</span>
            </div>
            <p className="text-gray-300 text-lg mb-4">{testimonial.comment}</p>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
              <p className="ml-2 text-yellow-400 font-bold">{'★'.repeat(testimonial.jumlahstar)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
