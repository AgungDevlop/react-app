import { Link } from "react-router-dom";
import { SEO } from "../components/SEO";

const NotFound = () => {
  return (
    <>
      <SEO 
        title="404 Not Found" 
        description="Halaman tidak ditemukan."
        url="https://agungwandev.com/404"
      />
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
          404
        </h1>
        <p className="text-slate-300 text-lg md:text-xl">
          Halaman hilang di antariksa.
        </p>
        <Link 
          to="/" 
          className="px-6 py-2 bg-slate-800 hover:bg-cyan-600 text-white rounded-lg transition-colors border border-white/10"
        >
          Kembali ke Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;