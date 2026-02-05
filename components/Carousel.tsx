
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  id: number;
  image: string;
  fallback: string;
  title: string;
  description: string;
  objectPosition?: string;
}

const SLIDES: CarouselSlide[] = [
  {
    id: 1,
    image: 'https://github.com/ahmadiabw/portal-jss/blob/main/aset/Carousel/penanda%20aras%201.jpg?raw=true',
    fallback: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1600&auto=format&fit=crop',
    title: 'Penanda Aras Strategik',
    description: 'Kolaborasi akademik bersama IPGK Sultan Abdul Halim memacu kecemerlangan kurikulum JSS.',
    objectPosition: 'center'
  },
  {
    id: 2,
    image: 'https://github.com/ahmadiabw/portal-jss/blob/main/aset/Carousel/Sekolah%20Pengajar%201.jpg?raw=true',
    fallback: 'https://images.unsplash.com/photo-1523050853021-eb9e1f2574e5?q=80&w=1600&auto=format&fit=crop',
    title: 'Sekolah Pengajar',
    description: 'Memupuk budaya perkongsian ilmiah bagi melahirkan pendidik bertaraf dunia.',
    objectPosition: 'center 20%'
  },
  {
    id: 3,
    image: 'https://github.com/ahmadiabw/portal-jss/blob/main/aset/Carousel/Jelajah%20Historia%20Misi%20Tanduo%201.jpg?raw=true',
    fallback: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?q=80&w=1600&auto=format&fit=crop',
    title: 'Pembelajaran Luar Bilik Darjah',
    description: 'Aplikasi kemahiran pemikiran sejarah dalam pembinaan sahsiah siswa guru yang holistik.',
    objectPosition: 'center'
  },
  {
    id: 4,
    image: 'https://github.com/ahmadiabw/portal-jss/blob/main/aset/Carousel/SPIN%202025%201.jpg?raw=true',
    fallback: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1600&auto=format&fit=crop',
    title: 'Program SPIN 2025',
    description: 'Mentransformasi idea kreatif kepada manifestasi inovasi dan penulisan kajian tindakan.',
    objectPosition: 'center'
  },
  {
    id: 5,
    image: 'https://github.com/ahmadiabw/portal-jss/blob/main/aset/Carousel/Sambutan%20Hari%20Kemerdekaan.jpg?raw=true',
    fallback: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1600&auto=format&fit=crop',
    title: 'Sambutan Bulan Kemerdekaan 2025',
    description: 'Malaysia MADANI: Rakyat Disantuni.',
    objectPosition: 'center'
  }
];

const Carousel: React.FC<{ theme?: 'light' | 'dark' }> = ({ theme = 'light' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hasError, setHasError] = useState<{ [key: number]: boolean }>({});

  const slideNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const slidePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(slideNext, 8000);
    return () => clearInterval(timer);
  }, [slideNext]);

  return (
    <section className="group relative w-full h-[450px] md:h-[700px] overflow-hidden bg-[#001a33]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#001a33] via-transparent to-black/20 z-10" />
          
          <img 
            src={hasError[currentIndex] ? SLIDES[currentIndex].fallback : SLIDES[currentIndex].image} 
            className="w-full h-full object-cover transition-opacity duration-500"
            style={{ objectPosition: SLIDES[currentIndex].objectPosition || 'center' }}
            alt={SLIDES[currentIndex].title}
            onError={() => {
              setHasError(prev => ({ ...prev, [currentIndex]: true }));
            }}
          />

          <div className="absolute inset-0 z-20 flex items-end justify-start p-8 md:p-20">
             <div className="max-w-2xl text-left">
               <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.3 }}
                 className="flex items-center gap-3 mb-4"
               >
                 <div className="h-0.5 w-10 bg-[#EE2A24]" />
                 <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">Tumpuan JSS</span>
               </motion.div>
               
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5, duration: 0.8 }}
                 className="text-3xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter mb-4 leading-none"
               >
                 {SLIDES[currentIndex].title}
               </motion.h2>
               
               <motion.p
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.9 }}
                 transition={{ delay: 0.7 }}
                 className="text-white/80 text-xs md:text-lg font-medium italic leading-relaxed border-l-2 border-[#EE2A24] pl-4"
               >
                 {SLIDES[currentIndex].description}
               </motion.p>
             </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-y-0 left-0 flex items-center justify-start p-4 md:p-8 z-30">
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(238, 42, 36, 0.9)' }}
          whileTap={{ scale: 0.9 }}
          onClick={slidePrev}
          className="p-4 md:p-5 rounded-full bg-white/10 text-white backdrop-blur-xl border border-white/20 shadow-2xl transition-colors md:opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={24} />
        </motion.button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center justify-end p-4 md:p-8 z-30">
        <motion.button 
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(238, 42, 36, 0.9)' }}
          whileTap={{ scale: 0.9 }}
          onClick={slideNext}
          className="p-4 md:p-5 rounded-full bg-white/10 text-white backdrop-blur-xl border border-white/20 shadow-2xl transition-colors md:opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-8 bg-[#EE2A24]' : 'w-2 bg-white/40 hover:bg-white'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
