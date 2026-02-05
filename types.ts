
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface StaffMember {
  id: string;
  name: string;
  position: string;
  field: string;
  image: string;
  description: string;
}

export interface NewsItem {
  id: string;
  date: string;         // Untuk paparan teks (contoh: 28 Feb 2025)
  timestamp: string;    // Untuk susunan (Format: YYYY-MM-DD, contoh: 2025-02-28)
  title: string;
  category: string;
  img: string;           
  fullContentImg: string; 
  description: string;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  image: string;
  day: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  STAFF = 'kakitangan',
  PROFIL = 'profil',
  PROGRAM = 'program',
  BERITA = 'berita'
}
