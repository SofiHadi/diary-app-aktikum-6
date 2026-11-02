import React, { createContext, useState, useContext, ReactNode } from "react";

// 1. Tipe data diseragamkan (menggunakan 'content' agar cocok dengan file lain)
export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood: string;
}

interface DiaryContextType {
  entries: DiaryEntry[];
  addEntry: (entry: DiaryEntry) => void;
  likedIds: string[];
  toggleLike: (id: string) => void;
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

// 2. Data awal (termasuk perbaikan string multiline yang error tadi)
const INITIAL_ENTRIES: DiaryEntry[] = [
  {
    id: "1",
    title: "Jalan pagi 20 menit sebelum memulai aktivitas.",
    content:
      "Pagi ini terasa tenang. Saya berjalan selama 20 menit dan menyiapkan agenda hari ini.", // <- Sudah diubah jadi 1 baris
    date: "2026-11-03",
    mood: "😊 Senang",
  },
  {
    id: "2",
    title: "Tugas Praktikum",
    content:
      "Menyelesaikan modul 6 dan membereskan error layar merah di React Native.",
    date: "2026-11-03",
    mood: "🔥 Bersemangat",
  },
];

export const DiaryProvider = ({ children }: { children: ReactNode }) => {
  const [entries, setEntries] = useState<DiaryEntry[]>(INITIAL_ENTRIES);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // Fungsi menambah entri (dipanggil dari create.tsx)
  const addEntry = (newEntry: DiaryEntry) => {
    setEntries((prevEntries) => [newEntry, ...prevEntries]);
  };

  // Fungsi toggle like global (tersinkronisasi di semua halaman)
  const toggleLike = (id: string) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <DiaryContext.Provider value={{ entries, addEntry, likedIds, toggleLike }}>
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = () => {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error("useDiary harus digunakan di dalam DiaryProvider");
  }
  return context;
};
