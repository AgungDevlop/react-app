import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Menggunakan ikon bintang

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get('https://andre.mediafolder.my.id/Star.json')
      .then((response) => {
        setTestimonials(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        <div className="spinner-border animate-spin w-16 h-16 border-4 border-t-4 border-white rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-white mb-8">Testimonial</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" />
              <p className="text-lg font-semibold">{testimonial.nama}</p>
            </div>
            <p className="text-gray-700 text-center mb-4">{testimonial.comment}</p>
            <div className="flex justify-center">
              {'★'.repeat(testimonial.jumlahstar).split('').map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
