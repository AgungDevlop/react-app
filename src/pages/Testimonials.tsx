import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Menggunakan ikon bintang
import axios from 'axios';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('https://andre.mediafolder.my.id/Star.json');
        setTestimonials(response.data);
      } catch (err) {
        setError('Gagal memuat testimonial');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Memuat Testimonial...</h2>
        <div className="spinner-border text-white" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Terjadi kesalahan</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl font-extrabold mb-8 text-center">Testimonial</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-3xl mb-4" />
            <p className="text-gray-300 text-lg italic">{testimonial.comment}</p>
            <p className="text-gray-400 mt-4">{testimonial.nama}</p>
            <p className="text-yellow-400 mt-2">{'★'.repeat(testimonial.jumlahstar)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
