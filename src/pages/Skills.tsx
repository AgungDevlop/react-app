import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faAndroid, 
  faReact, 
  faGitAlt, 
  faDocker, 
  faVuejs 
} from "@fortawesome/free-brands-svg-icons";
import { 
  faRocket, 
  faMobileScreen, 
  faLayerGroup 
} from "@fortawesome/free-solid-svg-icons";
import { SEO } from "../components/SEO";

const skills = [
  { 
    cat: "Languages", 
    items: [
      { n: "JavaScript", p: 90 }, 
      { n: "Kotlin", p: 80 }, 
      { n: "Dart", p: 75 }, 
      { n: "Python", p: 60 }, 
      { n: "PHP", p: 85 }
    ] 
  },
  { 
    cat: "Web Frameworks", 
    items: [
      { n: "React.js", p: 85 }, 
      { n: "Vue.js", p: 75 }, 
      { n: "Astro.js", p: 70 }, 
      { n: "Laravel", p: 85 }, 
      { n: "Tailwind CSS", p: 95 }
    ] 
  },
  { 
    cat: "Mobile & Hybrid", 
    items: [
      { n: "Jetpack Compose", p: 85 }, 
      { n: "Flutter", p: 80 }, 
      { n: "Capacitor.js", p: 75 }, 
      { n: "React Native", p: 65 }
    ] 
  },
  { 
    cat: "Tools & DB", 
    items: [
      { n: "MySQL", p: 70 }, 
      { n: "Firebase", p: 65 }, 
      { n: "Git", p: 80 },
      { n: "Docker", p: 60 }
    ] 
  },
];

export const Skills = () => {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoad(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO 
        title="Skills | AgungDev" 
        description="Daftar kemampuan teknis AgungDev: React, Flutter, Kotlin, Python, Database, dan Tools DevOps."
        url="https://agungwandev.com/skills"
      />
      <section className="max-w-6xl mx-auto px-4" aria-labelledby="skills-heading">
        <h1 id="skills-heading" className="text-4xl font-bold text-white text-center mb-16">
          Technical <span className="text-purple-500">Arsenal</span>
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16" aria-label="Highlighted Technologies">
          <SkillBadge icon={faAndroid} label="Jetpack Compose" color="text-green-400" border="border-green-500/30" />
          <SkillBadge icon={faReact} label="React Ecosystem" color="text-cyan-400" border="border-cyan-500/30" />
          <SkillBadge icon={faVuejs} label="Vue.js" color="text-emerald-400" border="border-emerald-500/30" />
          <SkillBadge icon={faMobileScreen} label="Flutter" color="text-blue-400" border="border-blue-500/30" />
          <SkillBadge icon={faRocket} label="Astro.js" color="text-orange-400" border="border-orange-500/30" />
          <SkillBadge icon={faLayerGroup} label="Capacitor" color="text-indigo-400" border="border-indigo-500/30" />
          <SkillBadge icon={faGitAlt} label="DevOps" color="text-red-400" border="border-red-500/30" />
          <SkillBadge icon={faDocker} label="Backend" color="text-blue-500" border="border-blue-600/30" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {skills.map((group, idx) => (
            <div key={group.cat} className="bg-black/40 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:border-purple-500/30 transition-colors duration-500">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-gradient-to-b from-cyan-500 to-purple-600 rounded-full" aria-hidden="true"></span>
                  {group.cat}
              </h2>
              <div className="space-y-5">
                {group.items.map((s) => (
                  <div key={s.n}>
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span className="text-slate-300">{s.n}</span>
                      <span className="text-cyan-400 font-mono">{s.p}%</span>
                    </div>
                    <div className="h-2 bg-slate-800/80 rounded-full overflow-hidden border border-white/5 relative" role="progressbar" aria-valuenow={s.p} aria-valuemin={0} aria-valuemax={100} aria-label={`Proficiency in ${s.n}`}>
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full relative shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                        style={{ 
                            width: load ? `${s.p}%` : '0%',
                            transition: `width 1.5s ease-out ${idx * 0.2}s`
                        }}
                      >
                          <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/50 blur-[2px]"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const SkillBadge = ({ icon, label, color, border }: any) => (
  <div className={`p-4 bg-black/60 rounded-2xl border ${border} flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform group`} title={label}>
    <FontAwesomeIcon icon={icon} className={`text-3xl ${color} drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform`} aria-hidden="true" />
    <span className="font-bold text-slate-200 text-sm text-center">{label}</span>
  </div>
);