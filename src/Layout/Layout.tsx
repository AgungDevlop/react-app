import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTimes } from '@fortawesome/free-solid-svg-icons';

const BlackHole = () => {
  const diskRef = useRef<THREE.Points>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  const particlesCount = 4000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.4 + Math.random() * 3.5;
      const spread = (Math.random() - 0.5) * 0.3;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = spread * (radius * 0.2);
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (diskRef.current) {
      diskRef.current.rotation.y = -time * 0.3;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(time * 1.5) * 0.03);
    }
  });

  return (
    <group position={[0, 0, -8]} rotation={[0.5, 0, 0]}>
      <mesh>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh ref={glowRef} scale={1.1}>
        <sphereGeometry args={[1.22, 64, 64]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.25} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
      </mesh>
      <points ref={diskRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#fb923c"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

const NebulaGalaxy = ({ position, colors, size, rotationSpeed, opacity = 0.5 }: { position: [number, number, number], colors: [string, string], size: number, rotationSpeed: number, opacity?: number }) => {
  const ref = useRef<THREE.Points>(null!);

  const parameters = {
    count: 8000,
    radius: size,
    branches: 4,
    spin: 1.2,
    randomness: 0.6,
    randomnessPower: 2.5,
  };

  const { positions, outputColors } = useMemo(() => {
    const positions = new Float32Array(parameters.count * 3);
    const outputColors = new Float32Array(parameters.count * 3);
    const colorInside = new THREE.Color(colors[0]);
    const colorOutside = new THREE.Color(colors[1]);

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY * (radius * 0.4);
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);

      outputColors[i3] = mixedColor.r;
      outputColors[i3 + 1] = mixedColor.g;
      outputColors[i3 + 2] = mixedColor.b;
    }
    return { positions, outputColors };
  }, [colors, size]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * rotationSpeed;
    }
  });

  return (
    <group position={position} rotation={[Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={parameters.count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={parameters.count} array={outputColors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          transparent
          opacity={opacity}
          sizeAttenuation={true}
        />
      </points>
    </group>
  );
};

const UniverseScene = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-black">
      <Canvas dpr={[1, 2]} gl={{ antialias: false, toneMapping: THREE.ACESFilmicToneMapping }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={55} />
        <color attach="background" args={['#050505']} />
        <Stars radius={300} depth={100} count={8000} factor={4} saturation={1} fade speed={0.2} />
        <BlackHole />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
          <NebulaGalaxy position={[12, 5, -15]} colors={["#06b6d4", "#1e3a8a"]} size={8} rotationSpeed={0.02} opacity={0.6} />
          <NebulaGalaxy position={[-15, -6, -20]} colors={["#d946ef", "#4c1d95"]} size={10} rotationSpeed={0.015} opacity={0.5} />
          <NebulaGalaxy position={[18, -12, -25]} colors={["#f59e0b", "#7c2d12"]} size={7} rotationSpeed={0.03} opacity={0.4} />
          <NebulaGalaxy position={[-10, 12, -30]} colors={["#10b981", "#064e3b"]} size={9} rotationSpeed={0.025} opacity={0.5} />
          <NebulaGalaxy position={[0, -20, -35]} colors={["#3b82f6", "#1d4ed8"]} size={12} rotationSpeed={0.01} opacity={0.3} />
          <NebulaGalaxy position={[25, 10, -40]} colors={["#ec4899", "#831843"]} size={15} rotationSpeed={0.01} opacity={0.4} />
          <NebulaGalaxy position={[-25, 0, -30]} colors={["#6366f1", "#312e81"]} size={6} rotationSpeed={0.04} opacity={0.6} />
          <NebulaGalaxy position={[5, 15, -25]} colors={["#f43f5e", "#881337"]} size={5} rotationSpeed={0.05} opacity={0.5} />
        </Float>
        <fog attach="fog" args={['#000000', 10, 50]} />
      </Canvas>
    </div>
  );
};

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
      await deferredPrompt.userChoice;
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
          <p className="text-slate-400 text-xs">Akses lebih cepat dari layar utama Anda.</p>
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

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-transparent text-slate-200 font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden relative">
      <UniverseScene />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 md:px-0 py-4 ${scrolled ? "py-2" : "py-4"
          }`}
      >
        <div className={`mx-auto max-w-5xl transition-all duration-300 ${scrolled
          ? "bg-black/40 backdrop-blur-md border border-white/5 shadow-2xl rounded-full px-6 py-2"
          : "bg-transparent px-6 py-4"
          } flex justify-between items-center`}
        >
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-tighter hover:text-cyan-400 transition-colors flex items-center gap-2 group">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-purple-400">
              AgungDev
            </span>
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#06b6d4]"></span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" icon="home" label="Home" active={location.pathname === "/"} />
            <NavLink to="/projects" icon="code" label="Projects" active={location.pathname === "/projects"} />
            <NavLink to="/contact" icon="envelope" label="Contact" active={location.pathname === "/contact"} />
          </nav>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white focus:outline-none p-2"
          >
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`}></i>
          </button>
        </div>
      </header>
      <div className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-2xl transition-all duration-500 flex flex-col justify-center items-center gap-8 ${isMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-10"
        }`}>
        <MobileLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileLink>
        <MobileLink to="/projects" onClick={() => setIsMenuOpen(false)}>Projects</MobileLink>
        <MobileLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileLink>
        <MobileLink to="/privacy" onClick={() => setIsMenuOpen(false)}>Privacy</MobileLink>
        <div className="absolute bottom-10 text-slate-500 text-sm">AgungDev Portfolio &copy; 2024</div>
      </div>
      <main className="relative z-10 container mx-auto px-6 pt-32 pb-20 min-h-[85vh]">
        <div className="animate-fade-in-up">
          <Outlet />
        </div>
      </main>
      <footer className="relative z-10 border-t border-white/5 bg-black/30 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm">
            © 2024 <span className="text-slate-300 font-semibold">AgungDev</span>. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <SocialIcon href="#" icon="github" />
            <SocialIcon href="#" icon="linkedin" />
            <SocialIcon href="#" icon="instagram" />
          </div>
        </div>
      </footer>
      <InstallPWA />
    </div>
  );
};

const NavLink = ({ to, icon, label, active }: { to: string, icon: string, label: string, active: boolean }) => (
  <Link to={to} className={`relative group flex items-center gap-2 text-sm font-medium transition-colors ${active ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}>
    <i className={`fas fa-${icon} text-xs`}></i>
    {label}
    <span className={`absolute -bottom-1 left-0 h-[2px] bg-cyan-400 shadow-[0_0_8px_#22d3ee] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
  </Link>
);

const MobileLink = ({ to, children, onClick }: { to: string, children: React.ReactNode, onClick: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-3xl font-bold text-slate-300 hover:text-cyan-400 hover:scale-110 transition-all duration-300"
  >
    {children}
  </Link>
);

const SocialIcon = ({ href, icon }: { href: string, icon: string }) => (
  <a href={href} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-cyan-500 hover:text-white hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1">
    <i className={`fab fa-${icon}`}></i>
  </a>
);

export default Layout;