
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  theme?: 'light' | 'dark';
}

const GradientText: React.FC<GradientTextProps> = ({ text, as: Component = 'span', className = '', theme = 'dark' }) => {
  const isDark = theme === 'dark';
  return (
    <Component className={`relative inline-block font-black tracking-tighter isolate ${className}`}>
      <motion.span
        className="absolute inset-0 z-10 block bg-gradient-to-r from-blue-600 via-red-500 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent"
        style={{ 
          backgroundImage: isDark 
            ? 'linear-gradient(to right, #FFFFFF, #EE2A24, #2563EB, #FFFFFF)'
            : 'linear-gradient(to right, #0F172A, #EE2A24, #2563EB, #0F172A)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        animate={{
          backgroundPosition: ['0% center', '200% center'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {text}
      </motion.span>
      
      <span 
        className={`block text-transparent bg-clip-text bg-gradient-to-r opacity-20`}
        style={{ 
          backgroundImage: isDark ? 'linear-gradient(to right, #FFFFFF, #94A3B8)' : 'linear-gradient(to right, #0F172A, #475569)',
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent' 
        }}
      >
        {text}
      </span>
      
      <span
        className={`absolute inset-0 -z-10 block blur-2xl opacity-30`}
        style={{ 
          backgroundColor: isDark ? 'rgba(238,42,36,0.2)' : 'rgba(238,42,36,0.1)',
          transform: 'translateZ(0)' 
        }}
      >
        {text}
      </span>
    </Component>
  );
};

export default GradientText;
