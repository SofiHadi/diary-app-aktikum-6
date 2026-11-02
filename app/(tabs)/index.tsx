import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useDiary, DiaryEntry } from "../../src/context/DiaryContext";

// Poin 2: Custom hook useDiarySearch menggunakan useMemo
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

const MOOD_OPTIONS = ["😊 Senang", "😢 Sedih", "😐 Netral", "🔥 Bersemangat"];

export default function HomeScreen() {
  const router = useRouter();
  // Mengambil data global dari Context agar sinkron
  const { entries, likedIds, toggleLike } = useDiary();

  const [searchQuery, setSearchQuery] = useState("");

  // Poin 1: State untuk filter mood
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  // Menggunakan custom hook
  const filteredEntries = useDiarySearch(entries, searchQuery, selectedMood);

  // Poin 6: Tombol Reset Filter
  const handleResetFilter = () => {
    setSearchQuery("");
    setSelectedMood(null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Cari diary..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filter Mood */}
      <View style={styles.moodContainer}>
        {MOOD_OPTIONS.map((mood) => (
          <TouchableOpacity
            key={mood}
            style={[
              styles.moodChip,
              selectedMood === mood && styles.moodChipSelected,
            ]}
            onPress={() => setSelectedMood(selectedMood === mood ? null : mood)}
          >
            <Text
              style={
                selectedMood === mood
                  ? styles.moodTextSelected
                  : styles.moodText
              }
            >
              {mood}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tombol Reset Filter */}
      {(searchQuery !== "" || selectedMood !== null) && (
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetFilter}
        >
          <Text style={styles.resetText}>Reset Filter</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={filteredEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isLiked = likedIds.includes(item.id);
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/detail/${item.id}`)}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress={() => toggleLike(item.id)}>
                  <Text style={{ fontSize: 20 }}>{isLiked ? "❤️" : "🤍"}</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.mood}>{item.mood}</Text>
              <Text style={styles.content} numberOfLines={2}>
                {item.content}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  moodContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  moodChip: { padding: 8, borderRadius: 16, backgroundColor: "#f0f0f0" },
  moodChipSelected: { backgroundColor: "#007AFF" },
  moodText: { color: "#333" },
  moodTextSelected: { color: "#fff", fontWeight: "bold" },
  resetButton: { padding: 8, alignSelf: "flex-end", marginBottom: 12 },
  resetText: { color: "#FF3B30", fontWeight: "600" },
  card: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 16, fontWeight: "bold" },
  mood: { fontSize: 12, color: "#666", marginVertical: 4 },
  content: { fontSize: 14, color: "#333" },
});
