import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Menggunakan ikon bintang
import axios from 'axios';

export const Testimonials = () => {
  const [name, setName] = useState('');
  const [stars, setStars] = useState(1);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  // Fungsi untuk meng-handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Membuat objek testimonial baru
    const newTestimonial = {
      id: Math.random().toString(36).substr(2, 9), // Membuat ID acak
      nama: name,
      Star: stars,
      comment: comment,
    };

    try {
      // Mendapatkan data yang ada di file Star.json
      const { data } = await axios.get('https://api.github.com/repos/AgungDevlop/Viral/contents/Star.json', {
        headers: {
          Authorization: `token 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`
        }
      });

      // Decode isi file JSON yang ada
      const jsonData = JSON.parse(atob(data.content));

      // Menambahkan testimonial baru ke array
      jsonData.push(newTestimonial);

      // Menyimpan data terbaru kembali ke GitHub
      await axios.put(
        'https://api.github.com/repos/AgungDevlop/Viral/contents/Star.json',
        {
          message: 'Menambahkan testimonial baru',
          content: btoa(JSON.stringify(jsonData)),
          sha: data.sha, // sha file untuk update
        },
        {
          headers: {
            Authorization: `token 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`,
          },
        }
      );
      setMessage('Testimonial berhasil ditambahkan!');
    } catch (error) {
      console.error('Error updating GitHub file', error);
      setMessage('Terjadi kesalahan, coba lagi.');
    }

    // Reset form
    setName('');
    setStars(1);
    setComment('');
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Testimonial</h2>

      {/* Form untuk input testimonial */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label className="block text-gray-300" htmlFor="name">
            Nama Anda
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 mt-1 bg-gray-700 text-white rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-300" htmlFor="stars">
            Jumlah Bintang
          </label>
          <input
            type="number"
            id="stars"
            value={stars}
            onChange={(e) => setStars(Math.min(5, Math.max(1, Number(e.target.value))))}
            min="1"
            max="5"
            required
            className="w-full p-2 mt-1 bg-gray-700 text-white rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block text-gray-300" htmlFor="comment">
            Komentar Anda
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full p-2 mt-1 bg-gray-700 text-white rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded text-white hover:bg-blue-700"
        >
          Kirim Testimonial
        </button>
      </form>

      {message && (
        <div className="mt-4 text-gray-300">
          <p>{message}</p>
        </div>
      )}

      {/* Daftar testimonial */}
      <h3 className="text-xl font-bold mb-4">Testimoni Pengguna</h3>
      <div className="grid grid-cols-1 gap-6">
        {/* Looping data testimonial yang ada */}
        {message && (
          <div
            className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" />
            <p className="text-gray-300">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};
