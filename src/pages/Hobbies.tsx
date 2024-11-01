import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faMusic, faGamepad, faRunning } from "@fortawesome/free-solid-svg-icons";

export const Hobbies = () => {
  const hobbiesData = [
    { name: "Programan", icon: faCode, description: "Saya suka mengembangkan perangkat lunak dan aplikasi." },
    { name: "Bermain Musik", icon: faMusic, description: "Saya menikmati bermain alat musik dan menciptakan melodi." },
    { name: "Main Game", icon: faGamepad, description: "Saya suka bermain game untuk bersantai dan bersenang-senang." },
    { name: "Olahraga", icon: faRunning, description: "Saya aktif dalam berbagai aktivitas olahraga untuk menjaga kebugaran." },
  ];

  return (
    <div className="p-6 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {hobbiesData.map((hobby) => (
          <div key={hobby.name} className="bg-gray-800 rounded-lg p-4 shadow-lg flex items-start">
            <FontAwesomeIcon icon={hobby.icon} className="text-3xl text-blue-500 mr-4" />
            <div>
              <h3 className="text-lg font-bold">{hobby.name}</h3>
              <p>{hobby.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
