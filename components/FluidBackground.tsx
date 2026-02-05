
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FluidBackgroundProps {
  theme?: 'light' | 'dark';
}

const StarField = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.7 + 0.3
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            transform: 'translateZ(0)'
          }}
          initial={{ opacity: star.opacity, scale: 1 }}
          animate={{
            opacity: [star.opacity, 1, star.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

const FluidBackground: React.FC<FluidBackgroundProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden transition-colors duration-700`} style={{ backgroundColor: isDark ? '#001a33' : '#F8FAFC' }}>
      {isDark && <StarField />}

      {/* Primary Blob */}
      <motion.div
        className={`absolute top-[-10%] left-[-10%] w-[100vw] h-[100vw] rounded-full mix-blend-multiply filter blur-[100px] opacity-30 transition-colors duration-700`}
        style={{ backgroundColor: isDark ? '#003366' : '#E2E8F0' }}
        animate={{
          x: [0, 50, -25, 0],
          y: [0, -25, 25, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Secondary Blob */}
      <motion.div
        className={`absolute top-[20%] right-[-20%] w-[90vw] h-[70vw] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 transition-colors duration-700`}
        style={{ backgroundColor: isDark ? '#EE2A24' : '#FFEDD5' }}
        animate={{
          x: [0, -50, 25, 0],
          y: [0, 50, -25, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
};

export default FluidBackground;
