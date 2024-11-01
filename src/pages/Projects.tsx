import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faShoppingCart, faRobot, faGamepad } from '@fortawesome/free-solid-svg-icons';

export const Projects = () => {
  const projectsData = [
    { name: "Sub For Unlock", url: "https://subs4unlock.com", icon: faLaptopCode },
    { name: "Toko Aplikasi Mod", url: "https://kedaimod.com", icon: faShoppingCart },
    { name: "Robot Whatsapp", url: "https://agungbot.my.id", icon: faRobot },
    { name: "Script Skin Mobile Legend", url: "https://mediafolder.my.id", icon: faGamepad },
  ];

  return (
    <div className="p-6 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projectsData.map((project) => (
          <div key={project.name} className="bg-gray-800 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={project.icon} className="text-blue-400 text-3xl mr-2" />
              <h3 className="text-lg font-semibold">{project.name}</h3>
            </div>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Lihat Proyek
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
