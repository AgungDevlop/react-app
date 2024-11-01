import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faPalette, faBriefcase, faGraduationCap, faEnvelope, faComment } from '@fortawesome/free-solid-svg-icons';

const PortfolioMenu = () => {
  const menuItems = [
    { name: "Skills", icon: faLaptopCode, path: "/react-app/skills" },
    { name: "Hobbies", icon: faPalette, path: "/react-app/hobbies" },
    { name: "Projects", icon: faBriefcase, path: "/react-app/projects" },
    { name: "Education", icon: faGraduationCap, path: "/react-app/education" },
    { name: "Contact", icon: faEnvelope, path: "/react-app/contact" },
    { name: "Testimonials", icon: faComment, path: "/react-app/testimonials" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
      {menuItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center relative aspect-w-1 aspect-h-1 transform hover:scale-105 active:scale-95 transition-transform duration-300"
        >
          <FontAwesomeIcon icon={item.icon} className="text-5xl text-blue-600 mb-2" />
          <span className="text-lg font-semibold text-gray-800">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default PortfolioMenu;
