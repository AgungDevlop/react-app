import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTimes } from '@fortawesome/free-solid-svg-icons';

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };
  
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in-up">
      <div className="bg-slate-800/80 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-4 max-w-xs flex items-center gap-4">
        <div className="flex-grow">
          <p className="text-white font-bold text-sm">Install Aplikasi Ini</p>
          <p className="text-slate-400 text-xs">Akses lebih cepat dan mudah dari layar utama Anda.</p>
        </div>
        <div className="flex items-center gap-2">
           <button
            onClick={handleInstallClick}
            className="w-10 h-10 flex items-center justify-center bg-cyan-500 text-white rounded-full hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            aria-label="Install App"
            >
                <FontAwesomeIcon icon={faDownload} />
            </button>
            <button
            onClick={handleDismiss}
            className="w-8 h-8 flex items-center justify-center bg-slate-700/50 text-slate-400 rounded-full hover:bg-slate-600/50 transition-colors"
            aria-label="Dismiss"
            >
                <FontAwesomeIcon icon={faTimes} className="text-xs" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPWA;