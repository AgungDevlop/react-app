import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faMusic, faGamepad, faRunning } from "@fortawesome/free-solid-svg-icons";
import { SEO } from "../components/SEO";

export const Hobbies = () => {
  const list = [
    { t: "Coding", i: faCode, d: "Eksplorasi teknologi baru & Open Source", c: "from-blue-500 to-cyan-500", glow: "shadow-cyan-500/20" },
    { t: "Music", i: faMusic, d: "Menciptakan harmoni nada & Lofi beats", c: "from-purple-500 to-pink-500", glow: "shadow-pink-500/20" },
    { t: "Gaming", i: faGamepad, d: "Strategi Real-time & Refleks Cepat", c: "from-green-500 to-emerald-500", glow: "shadow-emerald-500/20" },
    { t: "Sports", i: faRunning, d: "Calisthenics & Menjaga Kebugaran", c: "from-orange-500 to-red-500", glow: "shadow-orange-500/20" },
  ];

  return (
    <>
      <SEO 
        title="Hobbies | AgungDev" 
        description="Aktivitas dan hobi AgungDev di luar programming: Coding Eksperimental, Musik, Gaming, dan Olahraga."
        url="https://agungwandev.com/hobbies"
      />
      <section className="max-w-5xl mx-auto px-4" aria-labelledby="hobbies-heading">
        <h1 id="hobbies-heading" className="text-4xl font-bold text-white mb-12 text-center">
          Interests & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Passions</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {list.map((h, i) => (
            <article key={i} className={`group relative bg-black/40 border border-white/10 p-8 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl ${h.glow}`}>
              <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${h.c} opacity-20 blur-3xl rounded-full group-hover:opacity-30 transition-opacity duration-500`}></div>
              
              <div className="relative z-10 flex items-start gap-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${h.c} text-white shadow-lg`}>
                      <FontAwesomeIcon icon={h.i} className="text-2xl" aria-hidden="true" />
                  </div>
                  <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{h.t}</h2>
                      <p className="text-slate-400 leading-relaxed">{h.d}</p>
                  </div>
              </div>
              
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};