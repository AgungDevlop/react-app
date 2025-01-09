import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 8) +
         Math.random().toString(36).toUpperCase().substring(2, 8);
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [name, setName] = useState("");
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");

  const githubUrl = "https://api.github.com/repos/AgungDevlop/Viral/contents/testimonials.json";
  const token = "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";

  // Fetch testimonials from GitHub
  const fetchTestimonials = async () => {
    try {
      const response = await fetch(githubUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data dari GitHub");
      }

      const data = await response.json();
      const content = JSON.parse(atob(data.content)); // Decode Base64
      setTestimonials(content);
    } catch (error) {
      console.error(error);
      alert("Gagal memuat testimonial.");
    }
  };

  // Add new testimonial and update GitHub
  const fetchAndUpdateTestimonials = async () => {
    try {
      // Add new testimonial to local state
      const newTestimonial = {
        id: generateRandomId(),
        Nama: name,
        star: stars,
        comment,
      };
      const updatedContent = [...testimonials, newTestimonial];

      // Push updated content to GitHub
      const response = await fetch(githubUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Update testimonials",
          content: btoa(JSON.stringify(updatedContent, null, 2)), // Encode JSON to Base64
          sha: testimonials.sha, // Use SHA from previous fetch
        }),
      });

      if (response.ok) {
        alert("Testimonial berhasil disimpan!");
        setName("");
        setStars(0);
        setComment("");
        fetchTestimonials(); // Refresh testimonials after update
      } else {
        throw new Error("Gagal menyimpan testimonial.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan testimonial.");
    }
  };

  // Form submission
  const handleSubmit = () => {
    if (!name || stars === 0 || !comment) {
      alert("Semua field harus diisi!");
      return;
    }

    fetchAndUpdateTestimonials();
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Testimonial</h2>
      {/* Testimonial List */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={index < testimonial.star ? "text-yellow-400" : "text-gray-500"}
                />
              ))}
            </div>
            <p className="text-gray-300">
              <strong>{testimonial.Nama}</strong>: {testimonial.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Add New Testimonial */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Nama Anda"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded w-full mb-2 text-black"
        />
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              className={`mr-2 cursor-pointer ${
                stars > index ? "text-yellow-400" : "text-gray-500"
              }`}
              onClick={() => setStars(index + 1)}
            />
          ))}
        </div>
        <textarea
          placeholder="Komentar Anda"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="p-2 rounded w-full text-black"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="mt-4 p-2 bg-blue-500 rounded text-white"
        >
          Submit Testimonial
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
