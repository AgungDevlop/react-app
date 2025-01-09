import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export const Testimonials = () => {
  const [name, setName] = useState('');
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [testimonials, setTestimonials] = useState<any[]>([]); // To store the fetched testimonials

  // Fetch existing testimonials from GitHub on component mount
  const fetchTestimonials = async () => {
    try {
      const res = await axios.get('https://api.github.com/repos/AgungDevlop/Viral/contents/Star.json', {
        headers: {
          'Authorization': `Bearer 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`
        }
      });
      const sha = res.data.sha;
      const content = JSON.parse(atob(res.data.content));
      setTestimonials(content);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  // Call fetchTestimonials when the component mounts
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Function to handle testimonial submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name && stars > 0 && comment) {
      const newTestimonial = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
        nama: name,
        Star: stars,
        comment: comment,
      };

      try {
        // Fetch current testimonials and push the new one
        const res = await axios.get('https://api.github.com/repos/AgungDevlop/Viral/contents/Star.json', {
          headers: {
            'Authorization': `Bearer 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`
          }
        });
        const sha = res.data.sha;
        const content = JSON.parse(atob(res.data.content));
        content.push(newTestimonial);

        // Update the JSON file on GitHub
        await axios.put('https://api.github.com/repos/AgungDevlop/Viral/contents/Star.json', {
          message: 'Add new star entry',
          content: btoa(JSON.stringify(content, null, 2)),  // Base64 encode the updated content with formatting
          sha: sha,  // Use the sha here
        }, {
          headers: {
            'Authorization': `Bearer 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`
          }
        });

        // Add the new testimonial to the local state to reflect the change
        setTestimonials((prevTestimonials) => [...prevTestimonials, newTestimonial]);
        alert('Testimonial successfully added!');
        setName('');
        setStars(0);
        setComment('');
      } catch (error) {
        console.error('Error submitting testimonial:', error);
        alert('Failed to submit testimonial');
      }
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Testimonial</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700"
        />
        <div className="mb-4">
          <label className="block mb-2">Bintang</label>
          <select
            value={stars}
            onChange={(e) => setStars(Number(e.target.value))}
            className="w-full p-2 rounded bg-gray-700"
          >
            <option value={0}>Pilih Jumlah Bintang</option>
            <option value={1}>1 Bintang</option>
            <option value={2}>2 Bintang</option>
            <option value={3}>3 Bintang</option>
            <option value={4}>4 Bintang</option>
            <option value={5}>5 Bintang</option>
          </select>
        </div>
        <textarea
          placeholder="Komentar"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-700"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 hover:bg-blue-400 rounded"
        >
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
              <strong>{testimonial.nama}</strong> ({testimonial.Star} Bintang): {testimonial.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
              
