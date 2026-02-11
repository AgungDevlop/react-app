import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { SEO } from "../components/SEO";

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('data.json')
      .then((response) => {
        setTestimonials(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <SEO 
        title="Testimonials | AgungDev" 
        description="Apa kata klien dan kolaborator tentang kinerja, hasil proyek, dan dedikasi AgungDev."
        url="https://agungwandev.com/testimonials"
      />
      <section className="max-w-7xl mx-auto px-4 py-8" aria-labelledby="testimonial-heading">
        <div className="text-center mb-16 space-y-4">
          <h1 id="testimonial-heading" className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Stories</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Pengalaman nyata dari mereka yang telah berkolaborasi dalam semesta digital kami.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64" aria-label="Loading testimonials">
             <FontAwesomeIcon icon={faCircleNotch} className="text-4xl text-cyan-500 animate-spin" aria-hidden="true" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <article
                key={index}
                className="group relative flex flex-col p-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl hover:border-cyan-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
                
                <div className="absolute top-6 right-8 text-slate-800 group-hover:text-cyan-500/20 transition-colors duration-500">
                  <FontAwesomeIcon icon={faQuoteRight} className="text-6xl transform rotate-12" aria-hidden="true" />
                </div>

                <div className="flex gap-1 mb-6 relative z-10" aria-label={`Rating: ${item.jumlahstar} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={`text-sm ${
                        i < item.jumlahstar ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]' : 'text-slate-800'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="text-slate-300 leading-relaxed mb-8 relative z-10 flex-grow font-light italic">
                  "{item.comment}"
                </blockquote>

                <div className="flex items-center gap-4 mt-auto border-t border-white/5 pt-6 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] shadow-lg">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-bold text-lg">
                          {item.nama.charAt(0).toUpperCase()}
                      </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold tracking-wide group-hover:text-cyan-400 transition-colors">{item.nama}</h4>
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Verified Client</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
};