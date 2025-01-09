import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Menggunakan ikon bintang

export const Testimonials = () => {
  const [name, setName] = useState('');
  const [stars, setStars] = useState(1);
  const [comment, setComment] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !comment) {
      alert('Nama dan Komentar harus diisi.');
      return;
    }

    const newTestimonial = {
      id: generateRandomId(),
      nama: name,
      Star: stars,
      comment: comment,
    };

    try {
      setIsSubmitting(true);
      // Send the new testimonial data to the GitHub API
      const response = await fetch('https://api.github.com/repos/AgungDevlop/Viral/contents/Star.json', {
        method: 'GET',
        headers: {
          'Authorization': 'token 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',
          'Accept': 'application/vnd.github.v3+json',
        },
      });

      const fileData = await response.json();
      const fileContent = atob(fileData.content); // Decode the base64 content
      const currentTestimonials = JSON.parse(fileContent);
      currentTestimonials.push(newTestimonial);

      // Upload updated file content
      const updatedContent = btoa(JSON.stringify(currentTestimonials, null, 2)); // Encode back to base64

      await fetch('https://api.github.com/repos/AgungDevlop/Viral/contents/Star.json', {
        method: 'PUT',
        headers: {
          'Authorization': 'token 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',
          'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          message: 'Add new testimonial',
          content: updatedContent,
          sha: fileData.sha, // Ensure the file is updated correctly
        }),
      });

      setTestimonials([...currentTestimonials, newTestimonial]);
      setName('');
      setStars(1);
      setComment('');
      alert('Testimoni berhasil ditambahkan!');
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Terjadi kesalahan saat menyimpan testimoni.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateRandomId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Testimonial</h2>

      {/* Form to input new testimonial */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama Anda"
          className="p-2 mb-2 w-full bg-gray-700 text-white rounded"
        />
        <div className="mb-2">
          <label className="mr-2">Rating:</label>
          <select
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            className="p-2 bg-gray-700 text-white rounded"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} {star === 1 ? 'Star' : 'Stars'}
              </option>
            ))}
          </select>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Komentar Anda"
          rows={4}
          className="p-2 mb-2 w-full bg-gray-700 text-white rounded"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`p-2 bg-blue-500 rounded ${isSubmitting ? 'opacity-50' : ''}`}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Testimoni'}
        </button>
      </form>

      <div className="grid grid-cols-1 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" />
            <div className="text-gray-300">
              <strong>{testimonial.nama}</strong> ({testimonial.Star} Stars)
              <p>{testimonial.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
