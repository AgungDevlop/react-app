import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Menggunakan ikon bintang
import axios from 'axios';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    axios
      .get('https://andre.mediafolder.my.id/Star.json')
      .then((response) => {
        setTestimonials(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-white mb-8">Customer Testimonials</h2>
      {loading ? (
        <div className="flex justify-center items-center text-white">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition duration-300"
            >
              <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xl mr-2" />
                <p className="text-gray-300 text-lg font-semibold">{testimonial.nama}</p>
              </div>
              <p className="text-gray-400 text-sm mb-4">{testimonial.comment}</p>
              <div className="flex">
                {'★'.repeat(testimonial.jumlahstar).split('').map((star, idx) => (
                  <FontAwesomeIcon key={idx} icon={faStar} className="text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
