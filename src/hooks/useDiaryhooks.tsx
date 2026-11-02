import { useMemo } from "react";

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood: string;
}

// Custom hook untuk menggabungkan query & mood filter
export function useDiarySearch(
  entries: DiaryEntry[],
  query: string,
  selectedMood: string | null,
) {
  return useMemo(() => {
    return entries.filter((entry) => {
      const matchesQuery =
        entry.title.toLowerCase().includes(query.toLowerCase()) ||
        entry.content.toLowerCase().includes(query.toLowerCase());
      const matchesMood = selectedMood ? entry.mood === selectedMood : true;
      return matchesQuery && matchesMood;
    });
  }, [entries, query, selectedMood]);
}

// Custom hook untuk filter entri yang disukai (favorites)
export function useLikedEntries(entries: DiaryEntry[], likedIds: string[]) {
  return useMemo(() => {
    return entries.filter((entry) => likedIds.includes(entry.id));
  }, [entries, likedIds]);
}
