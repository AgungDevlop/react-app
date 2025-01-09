import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Using the star icon
import { useState } from 'react';

export const Testimonials = () => {
  const [name, setName] = useState('');
  const [star, setStar] = useState(1);
  const [comment, setComment] = useState('');
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTestimonial = {
      id: generateRandomId(),
      nama: name,
      Star: star,
      comment: comment,
    };

    // Save to GitHub Star.json using API
    try {
      const response = await fetch('https://api.github.com/repos/AgungDevlop/Viral/contents/Star.json', {
        method: 'GET',
        headers: {
          Authorization: `token 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`,
        },
      });

      const data = await response.json();
      const existingData = JSON.parse(atob(data.content));
      existingData.push(newTestimonial);

      const updatedData = btoa(JSON.stringify(existingData));

      await fetch('https://api.github.com/repos/AgungDevlop/Viral/contents/Star.json', {
        method: 'PUT',
        headers: {
          'Authorization': `token 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`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Add new testimonial',
          content: updatedData,
          sha: data.sha, // Required for updating an existing file
        }),
      });

      setTestimonials([...existingData, newTestimonial]);
      setName('');
      setStar(1);
      setComment('');
      alert('Testimonial submitted successfully!');
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('Failed to submit testimonial');
    }
  };

  // Function to generate a random ID for the testimonial
  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 9); // Generate a random string for the ID
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Testimonial</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Submit Your Testimonial</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700 text-gray-300"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div>
            <label className="text-gray-300">Star Rating</label>
            <select
              value={star}
              onChange={(e) => setStar(Number(e.target.value))}
              className="w-full p-2 mt-2 rounded bg-gray-700 text-gray-300"
            >
              {[1, 2, 3, 4, 5].map((starValue) => (
                <option key={starValue} value={starValue}>
                  {starValue} Star
                </option>
              ))}
            </select>
          </div>
          <textarea
            className="w-full p-2 rounded bg-gray-700 text-gray-300"
            placeholder="Your Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 p-2 rounded text-white hover:bg-blue-600 transition"
          >
            Submit Testimonial
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" />
            <p className="text-gray-300">
              <strong>{testimonial.nama}</strong> - {testimonial.Star} Stars
              <br />
              <span className="text-sm">{testimonial.comment}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
