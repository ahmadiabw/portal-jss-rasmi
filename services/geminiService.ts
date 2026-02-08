
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: {
          parts: [{ text: `Anda adalah 'MyJSS', Pembantu Digital Pintar bagi Jabatan Sains Sosial (JSS), IPG Kampus Tawau, Sabah.
        
        IDENTITI JABATAN:
        - Ketua Jabatan: Dr. Ahmadi bin Abd Wahab.
        - Kepakaran: Sejarah, Geografi.
        - Misi: Melahirkan guru Rabbani yang kompeten.
        
        GAYA BAHASA:
        - Gunakan Bahasa Melayu yang santun tetapi profesional (Standard Malaysia).
        - Gunakan emoji yang berkaitan (🎓, 🏛️, 📚).
        - Jawapan mestilah ringkas (bawah 50 patah perkataan) dan padat.
        
        KONTEKS PENTING:
        - Portal ini adalah platform rasmi jabatan untuk penyampaian maklumat digital.
        - Jika pengguna bertanya tentang pendaftaran, maklumkan tentang PISMP Sejarah 2026.
        - Lokasi kami di Balung, Tawau.` }]
        },
      },
    });

    return response.text || "Maaf, sistem tidak dapat menjana jawapan. Cuba lagi.";
  } catch (error) {
    console.error("Gemini Error:", error);
    if (error instanceof Error && (error.message.includes("404") || error.message.includes("not found"))) {
      return "⚠️ Konfigurasi AI diperlukan. Sila hubungi pentadbir sistem atau gunakan butang 'Set API Key' untuk pengaktifan.";
    }
    return "Terdapat gangguan pada rangkaian AI. Sila cuba sebentar lagi.";
  }
};
