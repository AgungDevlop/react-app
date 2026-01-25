import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faSchool, faCalendarAlt, faBook } from '@fortawesome/free-solid-svg-icons';

export const Education = () => {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-sm">
          Academic Journey
        </span>
      </h2>
      
      <div className="relative space-y-12">
        <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent -translate-x-1/2 shadow-[0_0_10px_#06b6d4]"></div>
        
        <TimelineItem 
          icon={faGraduationCap}
          year="Present"
          title="Institut Bisnis dan Teknologi Indonesia"
          subtitle="Teknologi Informasi"
          desc="Mengembangkan pemahaman mendalam tentang rekayasa perangkat lunak, sistem basis data, dan algoritma modern."
        />

        <TimelineItem 
          icon={faSchool}
          year="2020 - 2023"
          title="SMK N 1 Seririt"
          subtitle="Akuntansi"
          desc="Membangun dasar logika, manajemen data, dan ketelitian yang kuat yang kini diterapkan dalam pemrograman."
        />
        
        <TimelineItem 
          icon={faBook}
          year="2017 - 2020"
          title="SMP N 4 Seririt"
          subtitle="Pendidikan Menengah Pertama"
          desc="Masa pembentukan minat awal pada dunia teknologi dan logika pemecahan masalah."
        />

        <TimelineItem 
          icon={faBook}
          year="2011 - 2017"
          title="SD N 5 Lokapaksa"
          subtitle="Pendidikan Dasar"
          desc="Meletakkan fondasi pengetahuan dasar serta kemampuan belajar yang esensial untuk jenjang selanjutnya."
        />
      </div>

      <div className="mt-20 p-8 bg-black/40 border border-white/10 rounded-3xl backdrop-blur-md flex flex-col md:flex-row items-center gap-8 hover:border-cyan-500/30 transition-all duration-500">
        <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 rounded-full"></div>
            <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7rtB-aUhM-a9-CbhZUMWywfyOTGeDKwfogf9z8dQNPiTwOBL528PGBx0&s=10" 
            alt="Campus Logo" 
            className="relative w-24 h-24 rounded-2xl object-cover border-2 border-white/10 shadow-2xl" 
            />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-2">INSTIKI</h3>
          <p className="text-slate-300 leading-relaxed">
            Kampus teknologi terbaik di Bali. Tempat saya mengasah skill coding, berkolaborasi dalam tim, dan membangun networking profesional.
          </p>
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ icon, year, title, subtitle, desc }: any) => (
  <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse md:even:flex-row group`}>
    <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-2 border-cyan-500/30 bg-black shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
      <FontAwesomeIcon icon={icon} className="text-cyan-400 text-lg drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
    </div>
    
    <div className="ml-16 md:ml-0 w-full md:w-[calc(50%-3rem)] p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent">
        <div className="bg-black/60 backdrop-blur-xl border border-white/5 p-6 rounded-xl hover:bg-black/80 transition-all duration-300">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span className="bg-cyan-900/30 px-2 py-0.5 rounded border border-cyan-500/20">{year}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{title}</h3>
            <div className="text-purple-400 font-medium mb-3">{subtitle}</div>
            <p className="text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-3">{desc}</p>
        </div>
    </div>
  </div>
);