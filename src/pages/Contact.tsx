import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { SEO } from "../components/SEO";

export const Contact = () => {
  return (
    <>
      <SEO 
        title="Contact" 
        description="Get in touch with AgungDev via WhatsApp, Email, GitHub, or Instagram."
        url="https://agungwandev.com/contact"
      />
      <div className="max-w-3xl mx-auto text-center px-4">
        <div className="mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Connect</span>
          </h2>
          <p className="text-slate-300 text-lg">
            Siap mendiskusikan proyek antargalaksi baru atau sekadar menyapa? Hubungi saya melalui saluran komunikasi di bawah ini.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactBtn icon={faWhatsapp} label="WhatsApp" href="https://wa.me/628123456789" color="group-hover:bg-green-600/20 group-hover:border-green-500" iconColor="text-green-400" />
          <ContactBtn icon={faEnvelope} label="Email" href="mailto:email@example.com" color="group-hover:bg-red-600/20 group-hover:border-red-500" iconColor="text-red-400" />
          <ContactBtn icon={faGithub} label="GitHub" href="https://github.com" color="group-hover:bg-slate-700/50 group-hover:border-slate-400" iconColor="text-white" />
          <ContactBtn icon={faInstagram} label="Instagram" href="https://instagram.com" color="group-hover:bg-pink-600/20 group-hover:border-pink-500" iconColor="text-pink-400" />
        </div>
      </div>
    </>
  );
};

const ContactBtn = ({ icon, label, href, color, iconColor }: any) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer" 
    className={`group relative flex items-center justify-between p-6 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] ${color}`}
  >
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl transition-colors duration-300 group-hover:bg-white/10 ${iconColor}`}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <span className="font-bold text-xl text-slate-200 group-hover:text-white tracking-wide">{label}</span>
    </div>
    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/5">
        <i className="fas fa-arrow-right text-slate-500 group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-300"></i>
    </div>
  </a>
);