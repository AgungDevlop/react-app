import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faRocket, 
  faUserGraduate, 
  faCode, 
  faEnvelope, 
  faGamepad, 
  faStar 
} from "@fortawesome/free-solid-svg-icons";
import { SEO } from "../components/SEO";

export const Home = () => {
  const [text, setText] = useState("");
  const fullText = "Fullstack Developer & Android Enthusiast";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SEO 
        title="AgungDev - Fullstack Developer" 
        description="AgungDev Portfolio - Fullstack Developer & Android Enthusiast. Menjelajahi semesta kode untuk menciptakan solusi digital inovatif."
        url="https://agungwandev.com/"
      />
      <section className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-10 px-4" aria-label="Introduction">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <div className="relative w-44 h-44 rounded-full p-1 bg-black/50 backdrop-blur-sm overflow-hidden ring-2 ring-white/10">
              <img
              src="https://i.ibb.co.com/knyTR62/Whats-App-Image-2026-01-26-at-00-34-07.jpg"
              alt="Foto Profil AgungDev"
              width="176"
              height="176"
              className="w-full h-full rounded-full object-cover hover:scale-110 transition-transform duration-500"
              loading="eager"
              />
          </div>
        </div>

        <div className="space-y-6 max-w-3xl z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">AgungDev</span>
          </h1>
          <div className="h-8">
            <h2 className="text-xl md:text-2xl text-cyan-200 font-mono tracking-wide drop-shadow-md">
              {text}<span className="animate-pulse text-purple-400" aria-hidden="true">_</span>
            </h2>
          </div>
          <p className="text-slate-200 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto bg-black/10 backdrop-blur-sm p-4 rounded-xl border border-white/5 shadow-lg">
            Menjelajahi semesta kode untuk menciptakan solusi digital yang inovatif. 
          </p>
        </div>

        <nav className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl mt-8 pb-10" aria-label="Quick Navigation">
          <QuickLink to="/projects" icon={faRocket} label="Projects" color="from-blue-600 to-cyan-500" glow="shadow-blue-500/50" />
          <QuickLink to="/skills" icon={faCode} label="Skills" color="from-purple-600 to-pink-500" glow="shadow-purple-500/50" />
          <QuickLink to="/education" icon={faUserGraduate} label="Education" color="from-emerald-500 to-green-500" glow="shadow-emerald-500/50" />
          <QuickLink to="/hobbies" icon={faGamepad} label="Hobbies" color="from-orange-500 to-amber-500" glow="shadow-orange-500/50" />
          <QuickLink to="/testimonials" icon={faStar} label="Testimonials" color="from-yellow-400 to-orange-500" glow="shadow-yellow-500/50" />
          <QuickLink to="/contact" icon={faEnvelope} label="Contact" color="from-rose-500 to-red-500" glow="shadow-rose-500/50" />
        </nav>
      </section>
    </>
  );
};

const QuickLink = ({ to, icon, label, color, glow }: any) => (
  <Link to={to} className="group relative p-0.5 rounded-xl bg-gradient-to-br from-white/10 to-transparent hover:from-white/20 transition-all duration-300 hover:-translate-y-2" aria-label={`Go to ${label} page`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl blur-xl`}></div>
    <div className="relative h-full bg-black/10 backdrop-blur-[2px] rounded-[10px] p-6 flex flex-col items-center gap-3 border border-white/10 group-hover:border-white/20 overflow-hidden transition-colors">
      <div className={`absolute -right-6 -top-6 w-20 h-20 bg-gradient-to-br ${color} opacity-10 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
      <div className={`p-4 rounded-full bg-gradient-to-br ${color} text-white shadow-lg ${glow} group-hover:scale-110 transition-transform duration-300 opacity-90 group-hover:opacity-100`}>
        <FontAwesomeIcon icon={icon} className="text-xl" aria-hidden="true" />
      </div>
      <span className="font-bold text-slate-100 group-hover:text-white tracking-wide drop-shadow-md">{label}</span>
    </div>
  </Link>
);