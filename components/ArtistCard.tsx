
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Artist } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
  onClick: () => void;
  theme?: 'light' | 'dark';
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClick, theme = 'dark' }) => {
  const isDark = theme === 'dark';
  
  // Warna latar belakang dinamik berasaskan tema
  const bgRest = isDark ? '#000d1a' : '#FFFFFF';
  const bgHover = isDark ? '#001f3f' : '#f8fafc'; 

  return (
    <motion.div
      className={`group relative h-[450px] md:h-[550px] w-full overflow-hidden border-b md:border-r transition-colors duration-500 cursor-pointer`}
      style={{ 
        borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)'
      }}
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      variants={{
        rest: { 
          backgroundColor: bgRest,
          transition: { duration: 0.4 }
        },
        hover: { 
          backgroundColor: bgHover,
          transition: { duration: 0.4 }
        }
      }}
      data-hover="true"
      onClick={onClick}
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.img 
          src={artist.image} 
          alt={artist.name} 
          className="h-full w-full object-cover will-change-transform"
          variants={{
            rest: { scale: 1, opacity: isDark ? 0.7 : 0.85 },
            hover: { scale: 1.05, opacity: 1 }
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop';
          }}
        />
        {/* Themed Overlay Tint */}
        <div 
          className="absolute inset-0 transition-all duration-700" 
          style={{ 
            background: isDark 
              ? 'linear-gradient(to top, #001a33 0%, rgba(0,26,51,0.2) 60%, transparent 100%)' 
              : 'linear-gradient(to top, #FFFFFF 0%, rgba(255,255,255,0.2) 60%, transparent 100%)'
          }}
        />
        {/* Subtle color splash on hover */}
        <motion.div 
          className="absolute inset-0 bg-red-600 mix-blend-overlay"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 0.05 }
          }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
           <motion.span 
             variants={{
               rest: { opacity: 0.7, scale: 1 },
               hover: { opacity: 1, scale: 1.05 }
             }}
             className={`text-[10px] md:text-xs font-mono font-bold border px-4 py-1.5 rounded-full backdrop-blur-xl tracking-[0.2em] uppercase`}
             style={{ 
               backgroundColor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)',
               borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.2)',
               color: isDark ? 'white' : '#0F172A'
             }}
           >
             {artist.day}
           </motion.span>
           <motion.div
             variants={{
               rest: { opacity: 0, scale: 0.8, y: 10 },
               hover: { opacity: 1, scale: 1, y: 0 }
             }}
             className="bg-[#EE2A24] text-white rounded-full p-2 shadow-lg"
           >
             <ArrowUpRight className="w-5 h-5" />
           </motion.div>
        </div>

        <div>
          <div className="mb-2">
            <motion.h3 
              className={`font-heading text-lg md:text-xl font-black uppercase leading-tight break-words will-change-transform`}
              style={{ color: isDark ? 'white' : '#0F172A' }}
              variants={{
                rest: { y: 10, opacity: 0.8 },
                hover: { y: 0, opacity: 1 }
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {artist.name}
            </motion.h3>
          </div>
          <motion.div 
            className="flex items-center gap-3 mt-1 will-change-transform"
            variants={{
              rest: { opacity: 0.6, x: -5 },
              hover: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="w-8 h-px bg-[#EE2A24]" />
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#EE2A24]">
              {artist.genre}
            </p>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-[#EE2A24]"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default ArtistCard;
