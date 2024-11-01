import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

export const Education = () => {
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold">Pendidikan Saya</h2>
      <div className="mt-4 space-y-6">
        {/* SMK */}
        <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md">
          <FontAwesomeIcon icon={faSchool} className="text-4xl text-blue-500 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">SMK N 1 Seririt</h3>
            <p className="text-gray-300 text-base">Jurusan: Akuntansi</p>
          </div>
        </div>
        
        {/* Kuliah */}
        <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md">
          <FontAwesomeIcon icon={faGraduationCap} className="text-4xl text-blue-500 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Institut Bisnis dan Teknologi Indonesia</h3>
            <p className="text-gray-300 text-base">Jurusan: Teknologi Informasi</p>
          </div>
        </div>
      </div>

      {/* Logo Kampus */}
      <div className="flex items-center mt-6">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7rtB-aUhM-a9-CbhZUMWywfyOTGeDKwfogf9z8dQNPiTwOBL528PGBx0&s=10" 
          alt="Logo Institut Bisnis dan Teknologi Indonesia" 
          className="w-24 h-24 rounded-full object-cover mr-4" 
        />
        <div className="text-left">
          <p className="text-lg font-bold">Institut Bisnis dan Teknologi Indonesia</p>
          <p className="text-gray-300 text-sm">Saya sangat bersemangat untuk menempuh pendidikan di institusi ini, di mana saya belajar dan mengembangkan keterampilan saya dalam bidang Teknologi Informasi.</p>
        </div>
      </div>
    </div>
  );
};
