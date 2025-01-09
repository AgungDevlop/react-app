import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Menggunakan ikon bintang
import { useState } from 'react';

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !comment || !rating) return alert('Please fill out all fields');
    
    const newTestimonial = {
      id: Math.random().toString(36).substring(2, 15),  // Random ID
      Nama: name,
      star: rating,
      comment: comment,
    };

    // Add new testimonial to the local state
    const updatedTestimonials = [...testimonials, newTestimonial];
    setTestimonials(updatedTestimonials);

    // Save to GitHub (using fetch to call GitHub API)
    const token = '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';
    const username = 'AgungDevlop';
    const repo = 'Viral';
    const file = 'Star.json';
    const url = `https://api.github.com/repos/${username}/${repo}/contents/${file}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `token ${token}`,
      },
    });

    const data = await response.json();
    const currentContent = data.content ? JSON.parse(atob(data.content)) : [];
    currentContent.push(newTestimonial);

    const updatedFileContent = JSON.stringify(currentContent, null, 2);
    const encodedContent = btoa(updatedFileContent);  // Base64 encode the content

    // Update file with the new testimonial data
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Update Star.json with new testimonial',
        content: encodedContent,
        sha: data.sha,
      }),
    });

    // Reset form fields after submission
    setName('');
    setComment('');
    setRating(0);
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Testimonial</h2>
      <div className="grid grid-cols-1 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={`mr-2 ${i < testimonial.star ? 'text-yellow-400' : 'text-gray-500'}`}
              />
            ))}
            <div className="ml-2 text-gray-300">
              <p className="font-bold">{testimonial.Nama}</p>
              <p>{testimonial.comment}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-700 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Add Your Testimonial</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 bg-gray-800 text-white rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Your Comment"
              className="w-full p-2 bg-gray-800 text-white rounded-lg"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={`cursor-pointer ${index < rating ? 'text-yellow-400' : 'text-gray-500'}`}
                  onClick={() => handleStarClick(index)}
                />
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-yellow-500 text-black rounded-lg"
          >
            Submit Testimonial
          </button>
        </form>
      </div>
    </div>
  );
};
                                 
