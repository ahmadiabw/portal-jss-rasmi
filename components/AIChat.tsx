
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Headset } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIChatProps {
  theme?: 'light' | 'dark';
}

const AIChat: React.FC<AIChatProps> = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Selamat sejahtera! Saya MyJSS AI, pembantu maya Jabatan Sains Sosial IPGKT. Ada apa yang boleh saya bantu? 🇲🇾' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`mb-4 w-[90vw] md:w-96 backdrop-blur-2xl border rounded-2xl overflow-hidden shadow-2xl`}
            style={{ 
              backgroundColor: isDark ? 'rgba(0, 26, 51, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)'
            }}
          >
            <div className="p-4 flex justify-between items-center border-b" style={{ backgroundColor: '#003366', borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-2">
                <Headset className="w-5 h-5 text-white" />
                <h3 className="font-heading font-bold tracking-wider text-sm text-white">MYJSS ASSISTANT</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div 
              ref={chatContainerRef}
              className="h-80 overflow-y-auto p-4 space-y-4"
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#EE2A24] text-white' 
                      : isDark ? 'bg-white/10 text-gray-200' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className={`${isDark ? 'bg-white/5' : 'bg-slate-100'} p-3 rounded-xl flex gap-1`}>
                    <span className="w-1.5 h-1.5 bg-[#EE2A24] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#EE2A24] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)' }}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Tanya tentang program..."
                  className={`flex-1 bg-transparent text-sm focus:outline-none ${isDark ? 'text-white placeholder-white/20' : 'text-slate-900 placeholder-slate-400'}`}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-[#003366] p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-50 transition-all duration-300 relative ${isOpen ? 'bg-slate-900' : 'bg-[#003366]'}`}
        style={{ border: '2px solid rgba(255,255,255,0.15)' }}
        data-hover="true"
      >
        <div className="absolute inset-1 rounded-full border border-white/30 pointer-events-none" />
        
        {isOpen ? (
          <X className="w-6 h-6 text-white relative z-10" />
        ) : (
          <div className="relative z-10">
            <Headset className="w-7 h-7 text-white" strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#003366] animate-pulse" />
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
