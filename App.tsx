
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Menu, X, 
  Target, Compass, ExternalLink,
  Sun, Moon, Key
} from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ArtistCard from './components/ArtistCard';
import AIChat from './components/AIChat';
import Carousel from './components/Carousel';
import NewsSection from './components/NewsSection';
import { StaffMember } from './types';

// Define the AIStudio interface
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}

const THEMES = {
  light: {
    bgPrimary: '#FFFFFF',    
    bgSecondary: '#F8FAFC',  
    textPrimary: '#0F172A',  
    textSecondary: '#64748B',
    accentRed: '#EE2A24',    
    accentBlue: '#003366',   
    border: 'rgba(15, 23, 42, 0.06)',
    navBg: '#FFFFFF'
  },
  dark: {
    bgPrimary: '#001a33',    
    bgSecondary: '#000d1a',  
    textPrimary: '#FFFFFF',  
    textSecondary: '#94A3B8',
    accentRed: '#EE2A24',    
    accentBlue: '#3B82F6',   
    border: 'rgba(255, 255, 255, 0.08)',
    navBg: '#000d1a'
  }
};

const LOGO_URL = "https://github.com/ahmadiabw/portal-jss/blob/main/aset/logo%20IPGKT.png?raw=true";
const FALLBACK_LOGO = "https://upload.wikimedia.org/wikipedia/commons/8/87/Logo_IPGM.png";

const JSS_STAFF: StaffMember[] = [
  { 
    id: '1', 
    name: 'Dr. Ahmadi bin Abd Wahab', 
    position: 'Ketua Jabatan', 
    field: 'Geografi & Sejarah', 
    image: 'https://lh3.googleusercontent.com/pw/AP1GczP8_57pZa4Aw3DUQLEi-J8LVHxInZQMZ0RlmhgCEK0ookYOwHpAh62qgsgZmpOfUVaIl-Lgt7L6MC1XWPjgYdjAA_mP3AeMcMskaFULhiBChcDVCIzfuZ2DLCEgwdVCxq5v6d2dCItsmLGQGJaN9w_0=w800-h800-s-no-gm?authuser=0',
    description: 'Beliau merupakan Ketua Jabatan yang memiliki kelayakan Ijazah Doktor Falsafah (PhD) dalam Sains Bumi, Sarjana Sains Sosial, dan Ijazah Sarjana Muda Sastera dengan Pendidikan.'
  },
  { 
    id: '2', 
    name: 'En. Mhd Yusof bin Zakaria', 
    position: 'Pensyarah Kanan', 
    field: 'Unit Sejarah', 
    image: 'https://lh3.googleusercontent.com/pw/AP1GczMsNRQfR-qOWvxmAMFaoErY0s_qgX1cpxTDum1jLt2ijAG9oPJieoE7_w8kWoGMQNyeP2E9g3pf-LzwxPQ9W20a73CLuE8RzbJIw9X1NjEZ08mU1Z07Bjcmq5IrdTfqURGA92F6OwPieNUfdvDAPibD=w800-h800-s-no-gm?authuser=0',
    description: 'Pensyarah Kanan yang memiliki kelayakan Ijazah Sarjana (Pengurusan Disiplin), Ijazah Sarjana Muda serta Diploma Pendidikan dalam bidang Sejarah.'
  },
  { 
    id: '3', 
    name: 'Dr. Jusman bin Aman Setia', 
    position: 'Ketua Unit Sejarah', 
    field: 'Unit Sejarah', 
    image: 'https://lh3.googleusercontent.com/pw/AP1GczN-BCh1CRAv_Sw2JuAuWtGzDXoa8pCMW_0iwOei-aSr-AQ5zKmMmsjaKhsCFoZCkNMFhpAys0AnYI_W1WuaJ71jnuj35jO3f1uiG3dqlLPb0j7zWER8keE32Pzj3bjbrtUpnLu3tMQYtnGVcRJeB24G=w800-h800-s-no-gm?authuser=0',
    description: 'Beliau memegang jawatan Ketua Unit Sejarah dengan kelayakan PhD dan Sarjana dalam bidang Sejarah.'
  },
  { 
    id: '4', 
    name: 'Pn. Aggenes Tona Antonius', 
    position: 'Pensyarah', 
    field: 'Unit Sejarah', 
    image: 'https://lh3.googleusercontent.com/pw/AP1GczP1wcAHouAjo0gADvUazhLCk1y_BWKXQhPRBa2RGjrKJ8dNQ1SDcomrI9Ka2_xx_3Fc0-xM4zmKH_OfNd6lELpLVvGJmuiLFUHuvhBltVEp6lGgyhmoDix9OEowkGks-TsAWNcY0pwj8WAIvtT31KkX=w800-h800-s-no-gm?authuser=0',
    description: 'Beliau memiliki kelayakan Ijazah Sarjana Psikologi Pendidikan, Ijazah Sarjana Muda Sastera (Sejarah), dan Sijil Perguruan Asas.'
  },
  { 
    id: '5', 
    name: 'Dr. Muliyati binti Timbang', 
    position: 'Ketua Unit Muzik & Seni', 
    field: 'Unit Muzik & PSV', 
    image: 'https://lh3.googleusercontent.com/pw/AP1GczNR2Hs5o19E2CBwWUMZUk0cXvaTTE98bjNoIDot_6TsCTlEx1mcaCgpEE-mkHK1lZU_mVmT42f95FvUw6zdUdQMmHWaqM5L9GO94fYqVsTNJn52d8iYGEQoyQcS0d3-dvsaCkA9XQmqmWZX1hG0rLDs=w800-h800-s-no-gm?authuser=0',
    description: 'Ketua Unit Pendidikan Muzik dan Seni Visual yang berkelulusan PhD dan Sarjana dalam Pengurusan Pendidikan.'
  },
];

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const [logoHasError, setLogoHasError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  
  // Periksa jika aplikasi berjalan di dalam AI Studio
  const isInAiStudio = typeof window !== 'undefined' && (window as any).aistudio !== undefined;

  const theme = isDarkMode ? THEMES.dark : THEMES.light;

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.body.style.backgroundColor = theme.bgPrimary;
    document.body.style.color = theme.textPrimary;
  }, [isDarkMode, theme]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleKeySelection = async () => {
    try {
      if ((window as any).aistudio) {
        await (window as any).aistudio.openSelectKey();
      }
    } catch (error) {
      console.error("Gagal membuka pemilihan kunci:", error);
    }
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative min-h-screen transition-colors duration-500 selection:bg-[#EE2A24] selection:text-white cursor-auto md:cursor-none overflow-x-hidden"
      style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary }}
    >
      <CustomCursor />
      <FluidBackground theme={isDarkMode ? 'dark' : 'light'} />
      <AIChat theme={isDarkMode ? 'dark' : 'light'} />
      
      {/* Mini Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-[#003366] w-full" />
        <header className="py-4 px-6 md:px-12 flex items-center transition-all duration-500 backdrop-blur-xl border-b shadow-sm" style={{ backgroundColor: theme.navBg + 'E6', borderColor: theme.border }}>
          <div className="max-w-[1600px] w-full mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#003366] flex items-center justify-center">
                 <span className="text-white font-black text-[10px]">JSS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-xs md:text-sm tracking-tighter" style={{ color: theme.textPrimary }}>IPGKT</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center">
              <nav className="flex items-center font-heading font-bold text-[11px] uppercase tracking-[0.15em]">
                {['Profil', 'Kakitangan', 'Berita', 'Program'].map((item, idx, arr) => (
                  <React.Fragment key={item}>
                    <motion.button 
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="px-6 py-2 transition-all duration-300 opacity-60 hover:opacity-100 hover:tracking-[0.25em] relative group"
                      style={{ color: theme.textPrimary }}
                      whileHover={{ y: -2 }}
                    >
                      {item}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#EE2A24] transition-all group-hover:w-1/2" />
                    </motion.button>
                    {idx < arr.length - 1 && (
                      <div className="h-4 w-px bg-slate-200" style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
                    )}
                  </React.Fragment>
                ))}
              </nav>
              
              <div className="ml-8 pl-8 border-l flex items-center gap-2" style={{ borderColor: theme.border }}>
                {/* Butang Set API Key hanya muncul di dalam AI Studio */}
                {isInAiStudio && (
                  <button 
                    onClick={handleKeySelection}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-[#EE2A24] hover:text-white transition-all group relative border"
                    style={{ color: theme.textPrimary, borderColor: theme.border }}
                  >
                    <Key size={14} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Set API Key</span>
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none shadow-xl">
                      Konfigurasi Sistem AI
                    </span>
                  </button>
                )}
                
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-slate-100 transition-all border"
                  style={{ color: theme.textPrimary, borderColor: theme.border }}
                >
                  {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
                </button>
              </div>
            </div>

            <div className="flex items-center lg:hidden gap-4">
              {isInAiStudio && (
                <button onClick={handleKeySelection} className="p-2 border rounded-full" style={{ color: theme.textPrimary, borderColor: theme.border }}>
                  <Key size={18} />
                </button>
              )}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: theme.textPrimary }}>
                 {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Hero Branding Section */}
      <section className="relative pt-32 pb-16 px-6 md:px-12 flex items-center justify-center" style={{ backgroundColor: theme.bgPrimary }}>
        <div className="max-w-[1600px] w-full flex flex-col md:flex-row items-center justify-center gap-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 bg-white rounded-2xl shadow-xl border"
            style={{ borderColor: theme.border }}
          >
            <img 
              src={logoHasError ? FALLBACK_LOGO : LOGO_URL} 
              alt="Logo" 
              className="w-20 h-20 md:w-32 md:h-32 object-contain" 
              onError={() => setLogoHasError(true)} 
            />
          </motion.div>
          <div className="text-center md:text-left">
            <GradientText text="PORTAL RASMI" as="h1" className="text-3xl md:text-5xl" theme={isDarkMode ? 'dark' : 'light'} />
            <h2 className="text-lg md:text-2xl font-heading font-bold uppercase mt-2 tracking-widest opacity-80">JABATAN SAINS SOSIAL</h2>
            <div className="h-1 w-20 bg-[#EE2A24] mt-4 mx-auto md:mx-0" />
          </div>
        </div>
      </section>

      {/* Running Info Strip */}
      <div className="w-full py-6 border-y overflow-hidden shadow-inner" style={{ backgroundColor: isDarkMode ? '#000d1a' : '#FFFFFF', borderColor: theme.border }}>
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((i) => (
            <div key={i} className="flex shrink-0">
              {[...Array(4)].map((_, j) => (
                <span key={j} className="text-xl md:text-2xl font-black px-12 uppercase tracking-tighter flex items-center gap-6" style={{ color: theme.textPrimary }}>
                  SELAMAT DATANG KE PORTAL RASMI JABATAN SAINS SOSIAL <div className="w-3 h-3 bg-red-600 rounded-full" />
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Carousel */}
      <Carousel theme={isDarkMode ? 'dark' : 'light'} />

      {/* Profil Section */}
      <section id="profil" className="py-24 px-6" style={{ backgroundColor: theme.bgSecondary }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">HALA <GradientText text="TUJU" theme={isDarkMode ? 'dark' : 'light'} /></h2>
            <p className="max-w-2xl mx-auto opacity-60 font-medium">Visi dan misi utama Jabatan Sains Sosial dalam memacu kecemerlangan akademik dan sahsiah guru pelatih.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-10 rounded-3xl border shadow-sm transition-all hover:shadow-2xl hover:border-red-500/30"
              style={{ borderColor: theme.border, backgroundColor: isDarkMode ? '#001a33' : '#FFFFFF' }}
            >
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                <Target className="text-[#EE2A24] w-8 h-8" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 uppercase text-[#EE2A24]">VISI</h3>
              <p className="text-lg leading-relaxed font-medium italic opacity-80">"Melahirkan guru yang kompeten dan berjiwa pendidik melalui program pendidikan guru yang dinamik."</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-10 rounded-3xl border shadow-sm transition-all hover:shadow-2xl hover:border-blue-500/30"
              style={{ borderColor: theme.border, backgroundColor: isDarkMode ? '#001a33' : '#FFFFFF' }}
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Compass className="text-[#003366] w-8 h-8" />
              </div>
              <h3 className="text-2xl font-heading font-bold mb-4 uppercase text-[#003366]">MISI</h3>
              <p className="text-lg leading-relaxed font-medium opacity-80">"Memupuk komitmen guru pelatih dalam penyediaan guru yang berketrampilan dan mahir dalam kurikulum melalui pengurusan yang berketrampilan."</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kakitangan Section */}
      <section id="kakitangan" className="py-24 px-6" style={{ backgroundColor: theme.bgPrimary }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-4xl md:text-7xl font-heading font-bold leading-none tracking-tighter uppercase">
              WARGA <br/> <GradientText text="AKADEMIK" theme={isDarkMode ? 'dark' : 'light'} />
            </h2>
            <p className="max-w-md opacity-50 font-medium text-right uppercase tracking-widest text-xs">
              Pakar bidang sejarah & bidang sains sosial yang berdedikasi tinggi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px border rounded-3xl overflow-hidden shadow-sm" style={{ borderColor: theme.border, backgroundColor: theme.border }}>
            {JSS_STAFF.map((staff) => (
              <ArtistCard 
                key={staff.id} 
                artist={{
                  id: staff.id,
                  name: staff.name,
                  genre: staff.position,
                  image: staff.image,
                  day: staff.field,
                  description: staff.description
                }} 
                theme={isDarkMode ? 'dark' : 'light'}
                onClick={() => setSelectedStaff(staff)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Komponen Berita JSS */}
      <NewsSection theme={isDarkMode ? 'dark' : 'light'} />

      {/* Program 2026 Section */}
      <section id="program" className="py-24 px-6 border-t" style={{ backgroundColor: theme.bgPrimary, borderColor: theme.border }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-4 bg-blue-50 rounded-full mb-8">
            <GraduationCap className="w-12 h-12 text-[#003366]" />
          </div>
          <h2 className="text-4xl font-heading font-bold mb-6">Program Akademik 2026</h2>
          <div className="p-10 rounded-3xl border-2 border-dashed transition-all shadow-sm mb-10" style={{ borderColor: theme.border, backgroundColor: isDarkMode ? '#001a33' : '#FFFFFF' }}>
            <h3 className="text-3xl font-bold mb-4">PISMP SEJARAH</h3>
            <p className="text-lg opacity-60 font-medium mb-8">Tawaran pengambilan untuk tahun 2026. Fokus penuh kepada kecemerlangan pedagogi dan penguasaan kandungan sejarah.</p>
            <motion.a 
              href="https://pismp.moe.gov.my/" 
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#EE2A24] text-white rounded-full font-bold uppercase tracking-widest text-sm shadow-lg hover:shadow-red-500/20 transition-all"
            >
              Mohon Sekarang <ExternalLink size={18} />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t" style={{ borderColor: theme.border, backgroundColor: theme.bgSecondary }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-heading font-black text-xl mb-2">JSS IPGKT</h3>
            <div className="flex items-center gap-2 opacity-40">
              <p className="text-[10px] uppercase font-bold tracking-[0.3em]">Portal Rasmi Jabatan Sains Sosial</p>
            </div>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 text-center md:text-right">
            &copy; 2026 JABATAN SAINS SOSIAL IPGKT. <br/>
            <span className="text-[8px]">Powered by Google Gemini</span>
          </div>
        </div>
      </footer>

      {/* Staff Modal */}
      <AnimatePresence>
        {selectedStaff && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedStaff(null)} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl overflow-hidden rounded-[40px] flex flex-col md:flex-row shadow-2xl" style={{ backgroundColor: theme.bgPrimary, borderColor: theme.border, borderStyle: 'solid', borderWidth: '1px' }}>
              <button onClick={() => setSelectedStaff(null)} className="absolute top-6 right-6 z-20 p-3 rounded-full bg-slate-100 hover:bg-red-500 hover:text-white transition-all text-slate-800">
                <X size={24} />
              </button>
              <div className="flex flex-col md:flex-row w-full">
                <div className="md:w-1/2 h-80 md:h-auto">
                  <img src={selectedStaff.image} className="w-full h-full object-cover" />
                </div>
                <div className="md:w-1/2 p-12">
                  <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">{selectedStaff.field}</span>
                  <h3 className="text-3xl font-heading font-bold uppercase mt-4 mb-2 leading-tight" style={{ color: theme.textPrimary }}>{selectedStaff.name}</h3>
                  <p className="text-sm font-bold opacity-40 mb-8 uppercase tracking-widest border-b pb-4" style={{ color: theme.textPrimary, borderColor: theme.border }}>{selectedStaff.position}</p>
                  <p className="text-lg leading-relaxed opacity-70 font-medium" style={{ color: theme.textPrimary }}>{selectedStaff.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
