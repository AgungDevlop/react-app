import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export const Testimonials = () => {
  const [name, setName] = useState('');
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // Fungsi untuk menambah testimoni ke GitHub
  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate random ID
    const id = Math.random().toString(36).substring(7);

    // Data yang akan dikirimkan
    const newTestimonial = {
      id,
      nama: name,
      Star: stars,
      comment,
    };

    // Menambahkan testimoni baru ke array state
    setTestimonials((prevTestimonials) => [...prevTestimonials, newTestimonial]);

    // Mengirimkan data ke GitHub
    try {
      const response = await fetch(
        `https://api.github.com/repos/AgungDevlop/Viral/contents/Star.json`, 
        {
          method: 'GET',
          headers: {
            'Authorization': `token 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`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );
      const data = await response.json();
      const fileContent = atob(data.content); // Decode content from base64
      const jsonContent = JSON.parse(fileContent);

      // Menambahkan data testimoni baru ke dalam file JSON
      jsonContent.push(newTestimonial);

      const updatedContent = btoa(JSON.stringify(jsonContent)); // Encode kembali ke base64

      // Mengirimkan data baru ke GitHub
      const commitResponse = await fetch(
        `https://api.github.com/repos/AgungDevlop/Viral/contents/Star.json`, 
        {
          method: 'PUT',
          headers: {
            'Authorization': `token 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`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: "Add new testimonial",
            content: updatedContent,
            sha: data.sha, // SHA file yang ada sebelumnya
          }),
        }
      );
      const commitResult = await commitResponse.json();
      if (commitResult.content) {
        alert('Testimonial berhasil dikirim!');
      } else {
        alert('Gagal mengirim testimonial.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengirim testimonial.');
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Testimonial</h2>
      
      <form onSubmit={handleTestimonialSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 mb-2 w-full bg-gray-800 text-white rounded-md"
          required
        />
        <div className="mb-2">
          <label className="mr-2">Bintang: </label>
          <input
            type="number"
            min="1"
            max="5"
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            className="p-2 w-16 bg-gray-800 text-white rounded-md"
            required
          />
        </div>
        <textarea
          placeholder="Komentar"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="p-2 w-full bg-gray-800 text-white rounded-md"
          required
        />
        <button type="submit" className="mt-4 p-2 bg-blue-500 rounded-md">
          Kirim Testimonial
        </button>
      </form>

      <div className="grid grid-cols-1 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" />
            <div>
              <p className="text-gray-300"><strong>{testimonial.nama}</strong></p>
              <p className="text-gray-300">{testimonial.comment}</p>
              <p className="text-gray-300">Rating: {testimonial.Star} bintang</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
