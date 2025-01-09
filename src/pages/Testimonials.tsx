import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Menggunakan ikon bintang
import axios from 'axios'; // Import axios

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get('https://andre.mediafolder.my.id/Star.json') // Ganti dengan URL JSON baru
      .then((response) => {
        setTestimonials(response.data); // Mengatur data yang diterima ke state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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
            <p className="text-gray-300">{testimonial.comment}</p>
            <p className="text-gray-400">{testimonial.nama}</p>
            <p className="text-gray-400">{'★'.repeat(testimonial.jumlahstar)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
