import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExternalLinkAlt, 
  faCode, 
  faVideo,
  faPuzzlePiece,
  faSyringe,
  faPaintBrush
} from '@fortawesome/free-solid-svg-icons';

export const Projects = () => {
  const projects = [
    { 
      name: "Sub For Unlock", 
      url: "https://subs4unlock.com", 
      icon: faCode, 
      cat: "Web Tool", 
      desc: "Platform monetisasi konten untuk kreator dengan sistem lock link yang aman.", 
      color: "text-blue-400", 
      border: "hover:border-blue-500/50" 
    },
    { 
      name: "Viplay - Upload Video", 
      url: "https://viplay.top", 
      icon: faVideo, 
      cat: "Media Platform", 
      desc: "Platform berbagi video dengan fitur unggah dan streaming yang cepat dan andal.", 
      color: "text-red-400", 
      border: "hover:border-red-500/50" 
    },
    { 
      name: "Neon Magisk Modules", 
      url: "https://neonmagisk.my.id", 
      icon: faPuzzlePiece, 
      cat: "Android Tools", 
      desc: "Koleksi modul Magisk untuk kustomisasi dan peningkatan performa perangkat Android.", 
      color: "text-purple-400", 
      border: "hover:border-purple-500/50" 
    },
    { 
      name: "Neon Injector", 
      url: "https://neoninjector.my.id", 
      icon: faSyringe, 
      cat: "Gaming Tool", 
      desc: "Aplikasi injektor untuk game, memungkinkan kustomisasi dan modifikasi tingkat lanjut.", 
      color: "text-green-400", 
      border: "hover:border-green-500/50" 
    },
    { 
      name: "Visual Tools Skin Pro", 
      url: "https://apkpure.com/id/visual-tools-skin-pro/com.visual.toolskin/download", 
      icon: faPaintBrush, 
      cat: "Mobile App", 
      desc: "Aplikasi untuk kustomisasi skin visual pada game populer, memberikan pengalaman baru.", 
      color: "text-orange-400", 
      border: "hover:border-orange-500/50" 
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Featured <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Projects</span></h2>
        <p className="text-slate-400">Kumpulan karya terbaik yang telah saya kembangkan.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((item, idx) => (
          <a 
            key={idx} 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`group relative p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent transition-all duration-300 hover:-translate-y-2`}
          >
            <div className={`h-full bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-8 flex flex-col transition-all duration-300 ${item.border} group-hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.1)]`}>
                <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-xl bg-white/5 border border-white/5 ${item.color} shadow-lg`}>
                        <FontAwesomeIcon icon={item.icon} size="xl" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 uppercase tracking-wider group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                        {item.cat}
                    </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{item.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{item.desc}</p>
                
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 group-hover:text-white transition-colors mt-auto">
                    <span>Visit Project</span>
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};