import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faUserSecret, faLock, faServer } from "@fortawesome/free-solid-svg-icons";
import { SEO } from "../components/SEO";

const Privacy = () => {
  return (
    <>
      <SEO 
        title="Privacy Policy" 
        description="AgungDev's Privacy Policy regarding data collection and security."
        url="https://agungwandev.com/privacy"
      />
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="flex items-center gap-6 mb-10 border-b border-white/10 pb-8 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <FontAwesomeIcon icon={faShieldAlt} className="text-3xl text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Privacy Policy</h1>
              <p className="text-slate-400">Transparansi dan keamanan data Anda di AgungDev.</p>
            </div>
          </div>
          
          <div className="space-y-8 relative z-10">
            <Section icon={faUserSecret} title="1. Informasi yang Dikumpulkan">
              Kami mengumpulkan data dasar seperti Nama dan Email hanya ketika Anda menghubungi kami secara sukarela. Tidak ada pelacakan tersembunyi (hidden tracking) di situs ini.
            </Section>

            <Section icon={faServer} title="2. Penggunaan Data">
              Data digunakan secara eksklusif untuk analitik internal anonim guna meningkatkan performa situs dan untuk membalas pesan Anda. Kami tidak pernah menjual data ke pihak ketiga.
            </Section>

            <Section icon={faLock} title="3. Keamanan Sistem">
              Infrastruktur kami dilindungi dengan enkripsi SSL/TLS standar industri. Kami menerapkan protokol keamanan berlapis untuk memastikan integritas data tetap terjaga dari akses tidak sah.
            </Section>
          </div>
          
          <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center text-xs text-slate-500 font-mono">
            <span>AgungDev Security Protocol</span>
            <span>Last updated: {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </>
  );
};

const Section = ({ icon, title, children }: any) => (
  <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-cyan-500/20 transition-colors">
    <h2 className="flex items-center gap-3 text-lg font-bold text-white mb-3">
        <FontAwesomeIcon icon={icon} className="text-cyan-500 text-sm" />
        {title}
    </h2>
    <p className="text-slate-300 text-sm leading-relaxed pl-7">{children}</p>
  </div>
);

export default Privacy;