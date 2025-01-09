import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Menggunakan ikon bintang
import { useState } from 'react';
import axios from 'axios';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [nama, setNama] = useState('');
  const [star, setStar] = useState(1);
  const [comment, setComment] = useState('');
  
  // Mengambil data testimoni dari GitHub
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('https://api.github.com/repos/AgungDevlop/Viral/contents/Star.json');
      const fileContent = atob(response.data.content); // Decode base64
      const data = JSON.parse(fileContent);
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching data from GitHub:', error);
    }
  };

  // Menambahkan testimonial baru dan mengupdate ke GitHub
  const addTestimonial = async () => {
    const newTestimonial = {
      id: Math.random().toString(36).substr(2, 9), // Generate Random ID
      nama,
      Star: star,
      comment,
    };

    const updatedTestimonials = [...testimonials, newTestimonial];
    
    try {
      const fileContent = JSON.stringify(updatedTestimonials, null, 2);
      const encodedContent = btoa(fileContent); // Encode to base64

      await axios.put(
        'https://api.github.com/repos/AgungDevlop/Viral/contents/Star.json',
        {
          message: 'Update Star.json with new testimonial',
          content: encodedContent,
          sha: response.data.sha, // File sha from GET request to identify the file
        },
        {
          headers: {
            Authorization: `token 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`,
          },
        }
      );
      // Update local state with the new testimonial
      setTestimonials(updatedTestimonials);
    } catch (error) {
      console.error('Error updating data to GitHub:', error);
    }
  };

  // Handling form input changes
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTestimonial();
    setNama('');
    setStar(1);
    setComment('');
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Testimonial</h2>
      
      {/* Form untuk menambah testimonial */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Nama Anda"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="p-2 mb-2 w-full rounded bg-gray-700 text-white"
        />
        <div className="flex mb-2">
          <input
            type="number"
            value={star}
            min="1"
            max="5"
            onChange={(e) => setStar(parseInt(e.target.value))}
            className="p-2 w-1/2 mr-2 rounded bg-gray-700 text-white"
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Komentar Anda"
            className="p-2 w-1/2 rounded bg-gray-700 text-white"
          />
        </div>
        <button type="submit" className="p-2 bg-blue-500 rounded hover:bg-blue-600">
          Kirim Testimoni
        </button>
      </form>

      <div className="grid grid-cols-1 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" />
            <p className="text-gray-300">
              <strong>{testimonial.nama}</strong> (Bintang: {testimonial.Star})
              <br />
              {testimonial.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
