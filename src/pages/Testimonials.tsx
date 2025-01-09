import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Menggunakan ikon bintang
import React, { useState } from 'react';

export const Testimonials = () => {
  const [rating, setRating] = useState(0); // Star rating
  const [comment, setComment] = useState(''); // User comment
  const [name, setName] = useState(''); // User name
  const [testimonials, setTestimonials] = useState<any[]>([]); // Testimonials list

  // Function to handle star rating selection
  const handleRating = (star: number) => {
    setRating(star);
  };

  // Function to submit the testimonial to GitHub
  const submitTestimonial = async () => {
    if (!name || !comment || rating === 0) {
      alert('Please provide a name, comment, and rating!');
      return;
    }

    const testimonial = {
      id: generateRandomID(),
      Nama: name,
      star: rating,
      comment: comment,
    };

    // Post data to GitHub
    await postTestimonialToGitHub(testimonial);

    // Add testimonial to the local state (for UI update)
    setTestimonials([...testimonials, testimonial]);

    // Reset form
    setName('');
    setComment('');
    setRating(0);
  };

  // Generate a random ID
  const generateRandomID = () => {
    return Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
  };

  // Post the testimonial to the GitHub repository
  const postTestimonialToGitHub = async (testimonial: any) => {
    const token = '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'; // Your GitHub token
    const username = 'AgungDevlop'; // Your GitHub username
    const repo = 'Viral'; // Your GitHub repo
    const file = 'Star.json'; // File where the testimonials will be stored

    const url = `https://api.github.com/repos/${username}/${repo}/contents/${file}`;

    // Get the current content of the file to append the new testimonial
    const response = await fetch(url);
    const data = await response.json();

    const sha = data.sha;
    const currentContent = atob(data.content); // Decode the base64 content
    const testimonialsData = JSON.parse(currentContent);

    testimonialsData.push(testimonial); // Add the new testimonial

    const updatedContent = JSON.stringify(testimonialsData, null, 2);
    const encodedContent = btoa(updatedContent); // Encode the content back to base64

    // Make the API request to update the file on GitHub
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Add new testimonial',
        sha: sha,
        content: encodedContent,
      }),
    });
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Testimonial</h2>

      {/* Star Rating */}
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={faStar}
            className={`cursor-pointer ${rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
            onClick={() => handleRating(star)}
          />
        ))}
      </div>

      {/* Form for submitting testimonial */}
      <div className="mb-4">
        <input
          type="text"
          className="p-2 w-full bg-gray-800 text-white rounded-md"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <textarea
          className="p-2 w-full bg-gray-800 text-white rounded-md"
          rows={4}
          placeholder="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={submitTestimonial}
      >
        Submit Testimonial
      </button>

      {/* Display Testimonials */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" />
            <p className="text-gray-300">{testimonial.Nama} - {testimonial.star} stars</p>
            <p className="text-gray-300 ml-4">"{testimonial.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};
