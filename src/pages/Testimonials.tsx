import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Menggunakan ikon bintang

export const Testimonials = () => {
  const [name, setName] = useState('');
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  
  // Fungsi untuk menambahkan testimoni
  const addTestimonial = async () => {
    if (!name || stars <= 0 || !comment) {
      alert('Semua kolom harus diisi!');
      return;
    }

    // Membuat objek testimoni baru
    const newTestimonial = {
      id: generateRandomId(),
      nama: name,
      Star: stars,
      comment: comment,
    };

    // Mengirim data testimoni ke GitHub
    try {
      const response = await fetch('https://api.github.com/repos/AgungDevlop/Viral/contents/Star.json', {
        method: 'GET',
        headers: {
          'Authorization': `token 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`,
          'Accept': 'application/vnd.github.v3.raw',
        },
      });

      const data = await response.json();
      const existingData = JSON.parse(atob(data.content)); // Mengambil dan mendekodekan isi file JSON

      // Menambahkan testimoni baru ke data yang sudah ada
      existingData.push(newTestimonial);

      // Menyimpan data yang telah diperbarui ke GitHub
      await fetch('https://api.github.com/repos/AgungDevlop/Viral/contents/Star.json', {
        method: 'PUT',
        headers: {
          'Authorization': `token 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`,
        },
        body: JSON.stringify({
          message: 'Menambahkan testimoni baru',
          committer: {
            name: 'AgungDevlop',
            email: 'agung@example.com',
          },
          content: btoa(JSON.stringify(existingData)), // Mengkodekan kembali konten menjadi base64
          sha: data.sha, // SHA dari file yang ada
        }),
      });

      // Memperbarui state testimonials di frontend
      setTestimonials(existingData);
      alert('Testimoni berhasil ditambahkan!');
    } catch (error) {
      console.error('Error menyimpan testimoni:', error);
      alert('Terjadi kesalahan saat mengirim testimoni.');
    }
  };

  // Fungsi untuk menghasilkan ID acak
  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Testimonial</h2>
      <div className="grid grid-cols-1 gap-6 mb-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" />
            <p className="text-gray-300">{testimonial.nama}: {testimonial.comment}</p>
            <p className="ml-2 text-gray-400">({testimonial.Star} stars)</p>
          </div>
        ))}
      </div>

      {/* Form untuk menambahkan testimoni */}
      <div className="mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Pemberi Testimoni"
          className="mb-2 p-2 w-full rounded border border-gray-300"
        />
        <div className="flex items-center mb-2">
          <input
            type="number"
            value={stars}
            onChange={(e) => setStars(parseInt(e.target.value))}
            placeholder="Jumlah Bintang"
            min="1"
            max="5"
            className="p-2 w-1/2 rounded border border-gray-300"
          />
          <FontAwesomeIcon icon={faStar} className="text-yellow-400 ml-2" />
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Komentar"
          className="p-2 w-full rounded border border-gray-300"
        />
        <button
          onClick={addTestimonial}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Kirim Testimoni
        </button>
      </div>
    </div>
  );
};
