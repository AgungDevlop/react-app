import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt, faLaptopCode } from "@fortawesome/free-solid-svg-icons";

const skillsData = [
  {
    category: "Bahasa Pemrograman",
    skills: [
      { name: "JavaScript", percentage: 70 },
      { name: "Python", percentage: 30 },
      { name: "Java", percentage: 60 },
      { name: "PHP", percentage: 70 },
    ],
  },
  {
    category: "Library/Framework",
    skills: [
      { name: "React", percentage: 40 },
      { name: "Laravel", percentage: 60 },
      { name: "Alpine JS", percentage: 40 },
    ],
  },
  {
    category: "Database",
    skills: [
      { name: "Firebase", percentage: 30 },
      { name: "MySQL", percentage: 50 },
    ],
  },
];

export const Skills = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100); // Delay untuk memicu animasi
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 text-white">
      {/* Kartu Pengembang */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg flex flex-col items-center">
          <FontAwesomeIcon icon={faMobileAlt} className="text-5xl text-blue-500 mb-2" />
          <h3 className="text-lg font-bold">Pengembang Android</h3>
          <p className="text-center">Saya mengkhususkan diri dalam membuat aplikasi Android yang intuitif dan responsif.</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg flex flex-col items-center">
          <FontAwesomeIcon icon={faLaptopCode} className="text-5xl text-blue-500 mb-2" />
          <h3 className="text-lg font-bold">Pengembang Web Full Stack</h3>
          <p className="text-center">Saya mengembangkan solusi front-end dan back-end untuk aplikasi web.</p>
        </div>
      </div>

      {skillsData.map((category, index) => (
        <div key={category.category} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{category.category}</h3>
          {category.skills.map((skill) => (
            <div key={skill.name} className="mb-4">
              <div className="flex justify-between mb-1">
                <span>{skill.name}</span>
                <span>{visible ? skill.percentage + "%" : "0%"}</span>
              </div>
              <div className="relative w-full bg-gray-600 rounded-full h-4">
                <div
                  className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-in-out ${
                    visible
                      ? skill.percentage < 50
                        ? 'bg-blue-700' // Biru tua untuk persentase rendah
                        : skill.percentage < 70
                        ? 'bg-blue-500' // Biru sedang untuk persentase sedang
                        : 'bg-blue-400' // Biru lebih terang untuk persentase tinggi
                      : 'bg-gray-600'
                  }`}
                  style={{
                    width: visible ? `${skill.percentage}%` : '0%',
                  }}
                ></div>
              </div>
            </div>
          ))}
          {/* Pembatas untuk memisahkan kategori keterampilan */}
          {index < skillsData.length - 1 && (
            <div className="border-t border-gray-500 my-4"></div>
          )}
        </div>
      ))}
    </div>
  );
};
