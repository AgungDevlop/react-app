import React, { useEffect, useState } from "react";
import PortfolioMenu from "../components/PortfolioMenu";

export const Home = () => {
  const [displayedName, setDisplayedName] = useState("");
  const fullName = "Portofolio Agung Developer"; // Diubah sesuai permintaan
  const typingSpeed = 100;

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayedName(fullName.slice(0, index + 1));
      index++;
      if (index === fullName.length) {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-200 font-[Poppins] relative z-20">
      <img
        src="https://i.ibb.co.com/hymb47Y/IMG-20240908-202646.jpg" // Ganti dengan path gambar yang sebenarnya
        alt="Agung Developer"
        className="w-32 h-32 rounded-full border-4 border-gray-200 mb-4"
      />
      <h2 className="text-2xl font-bold mb-2 text-center"> {/* Diubah dari font-light menjadi font-bold */}
        {displayedName.split(" ").map((word, index) => (
          <span
            key={index}
            className={`${
              index % 2 === 0 ? "text-indigo-400" : "text-teal-400"
            }`}
          >
            {word}{" "}
          </span>
        ))}
      </h2>
      <PortfolioMenu />
    </div>
  );
};

