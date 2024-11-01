export const Contact = () => {
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Kontak Saya</h2>
      <div className="grid grid-cols-1 gap-6">
        {/* Card untuk Email */}
        <a href="mailto:agungofficialdev@gmail.com" className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
          <div className="mr-4">
            <span className="text-2xl text-blue-500">📧</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Email</h3>
            <p className="text-gray-300">agungofficialdev@gmail.com</p>
          </div>
        </a>

        {/* Card untuk Instagram */}
        <a href="https://www.instagram.com/agungeka_22" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
          <div className="mr-4">
            <span className="text-2xl text-blue-500">📷</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Instagram</h3>
            <p className="text-gray-300">@agungeka_22</p>
          </div>
        </a>

        {/* Card untuk WhatsApp */}
        <a href="https://wa.me/62881037428871" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
          <div className="mr-4">
            <span className="text-2xl text-blue-500">📞</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">WhatsApp</h3>
            <p className="text-gray-300">+62881037428871</p>
          </div>
        </a>

        {/* Card untuk Telegram */}
        <a href="https://t.me/Agung220903" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
          <div className="mr-4">
            <span className="text-2xl text-blue-500">📬</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Telegram</h3>
            <p className="text-gray-300">t.me/Agung220903</p>
          </div>
        </a>
      </div>
    </div>
  );
};
