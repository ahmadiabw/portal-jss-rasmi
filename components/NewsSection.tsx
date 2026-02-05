
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, X, Maximize2, ChevronDown, ChevronUp } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsSectionProps {
  theme?: 'light' | 'dark';
}

const JSS_NEWS_DATA: NewsItem[] = [
  { 
    id: 'n1',
    date: '9 hingga 13 Jun 2025', 
    timestamp: '2025-06-09',
    title: 'Program Penanda Aras IPGK Tawau Ke IPGK Sultan Abdul Halim Kedah', 
    category: 'PPB',
    img: 'https://github.com/ahmadiabw/portal-jss/blob/main/aset/Berita%20Semasa/1.%20Benchmarking/benchmarking%201.jpg?raw=true', 
    fullContentImg: 'https://github.com/ahmadiabw/portal-jss/blob/main/aset/Berita%20Semasa/1.%20Benchmarking/2.%20penanda%20aras.jpg?raw=true', 
    description: 'Memperkasa hubungan dua hala dan berkongsi amalan terbaik dalam pengurusan kurikulum sains sosial antara dua zon.'
  },
  { 
    id: 'n2',
    date: '22 Julai - 1 Oktober 2025', 
    timestamp: '2025-07-22',
    title: 'Sambutan Bulan Kemerdekaan', 
    category: 'Aktiviti Siswa Guru',
    img: 'https://github.com/ahmadiabw/portal-jss/blob/main/aset/Berita%20Semasa/2.%20Bulan%20Kemerdekaan/merdeka%201.jpg?raw=true', 
    fullContentImg: 'https://github.com/ahmadiabw/portal-jss/blob/main/aset/Berita%20Semasa/2.%20Bulan%20Kemerdekaan/3.%20Bulan%20kemerdekaan.jpg?raw=true', 
    description: 'Malaysia MADANI: Rakyat Disantuni.'
  },
  { 
    id: 'n3',
    date: '28 Feb 2025', 
    timestamp: '2025-02-28',
    title: 'Program SPIN', 
    category: 'PPBG',
    img: 'https://github.com/ahmadiabw/portal-jss/blob/main/aset/Berita%20Semasa/3.%20Program%20SPIN/SPIN%201.jpg?raw=true', 
    fullContentImg: 'https://github.com/ahmadiabw/portal-jss/blob/main/aset/Berita%20Semasa/3.%20Program%20SPIN/OPR%20SPIN.jpg?raw=true', 
    description: 'Siri bengkel sekolah penyelidikan dan inovasi bagi meningkatkan kualiti penulisan ilmiah.'
  },
  { 
    id: 'n4',
    date: '15 Disember 2024', 
    timestamp: '2024-12-15',
    title: 'Sekolah Pengajar', 
    category: 'PPBG',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop', 
    fullContentImg: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1600&auto=format&fit=crop', 
    description: 'Inisiatif jabatan dalam memastikan kualiti pengajaran pensyarah sentiasa relevan dengan perkembangan semasa.'
  },
];

const NewsSection: React.FC<NewsSectionProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showArchive, setShowArchive] = useState(false);

  const colors = {
    bg: isDark ? '#000d1a' : '#F8FAFC',
    card: isDark ? '#001a33' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#0F172A',
    border: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.06)'
  };

  const sortedNews = useMemo(() => {
    return [...JSS_NEWS_DATA].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, []);

  const visibleNews = showArchive ? sortedNews : sortedNews.slice(0, 3);

  return (
    <section id="berita" className="py-24 px-6 transition-colors duration-500" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-4 flex-1">
            <div className="h-px w-12 bg-[#EE2A24]" />
            <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-tighter" style={{ color: colors.text }}>
              Berita <span className="text-[#EE2A24]">JSS</span>
            </h2>
          </div>
          <p className="max-w-xs text-[10px] uppercase font-bold tracking-[0.2em] opacity-40" style={{ color: colors.text }}>
            Laporan aktiviti dan perkembangan terkini warga Jabatan Sains Sosial IPGKT.
          </p>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleNews.map((news) => (
              <motion.div 
                key={news.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedNews(news)}
                className="group cursor-pointer rounded-2xl overflow-hidden border transition-all hover:shadow-2xl"
                style={{ borderColor: colors.border, backgroundColor: colors.card }}
                data-hover="true"
              >
                <div className="h-64 overflow-hidden relative">
                  <motion.img 
                    src={news.img} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt={news.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono font-bold text-[#EE2A24] uppercase border border-red-500/20 px-3 py-1 rounded-full bg-red-500/5">
                      {news.category}
                    </span>
                    <span className="text-[10px] opacity-40 font-bold uppercase tracking-tighter flex items-center gap-1" style={{ color: colors.text }}>
                      <Clock size={10} /> {news.date}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold leading-tight group-hover:text-[#EE2A24] transition-colors mb-3" style={{ color: colors.text }}>
                    {news.title}
                  </h4>
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#EE2A24]">
                    Lihat Berita Penuh <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {sortedNews.length > 3 && (
          <div className="mt-16 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowArchive(!showArchive)}
              className="flex items-center gap-3 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs border-2 transition-all shadow-lg"
              style={{ 
                borderColor: '#EE2A24', 
                backgroundColor: showArchive ? '#EE2A24' : 'transparent',
                color: showArchive ? '#FFFFFF' : '#EE2A24'
              }}
            >
              {showArchive ? (
                <>Tutup Arkib <ChevronUp size={16} /></>
              ) : (
                <>Arkib Berita <ChevronDown size={16} /></>
              )}
            </motion.button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedNews && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setSelectedNews(null)} 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30, opacity: 0 }} 
              animate={{ scale: 1, y: 0, opacity: 1 }} 
              exit={{ scale: 0.9, y: 30, opacity: 0 }} 
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-[32px] flex flex-col md:flex-row shadow-2xl border" 
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
            >
              <button 
                onClick={() => setSelectedNews(null)} 
                className="absolute top-6 right-6 z-50 p-4 rounded-full bg-white text-black hover:bg-[#EE2A24] hover:text-white transition-all shadow-2xl border border-slate-200"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row w-full overflow-hidden">
                <div className="md:w-[60%] h-[350px] md:h-auto bg-[#000d1a] relative group flex items-center justify-center overflow-hidden">
                  <img src={selectedNews.fullContentImg} className="w-full h-full object-contain" />
                </div>
                <div className="md:w-[40%] p-8 md:p-12 flex flex-col overflow-y-auto" style={{ backgroundColor: colors.card }}>
                  <div className="mb-8">
                    <span className="bg-[#EE2A24] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 inline-block">
                      {selectedNews.category}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-heading font-black uppercase mb-6 leading-tight" style={{ color: colors.text }}>
                      {selectedNews.title}
                    </h3>
                    <div className="flex items-center gap-2 opacity-50 mb-8">
                      <Calendar size={14} className="text-[#EE2A24]" />
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: colors.text }}>{selectedNews.date}</span>
                    </div>
                    <p className="text-lg leading-relaxed opacity-80 font-medium italic" style={{ color: colors.text }}>
                      "{selectedNews.description}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NewsSection;
