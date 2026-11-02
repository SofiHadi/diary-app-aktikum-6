import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useDiary, DiaryEntry } from "../../src/context/DiaryContext";

// Poin 3: Custom hook useLikedEntries
export function useLikedEntries(entries: DiaryEntry[], likedIds: string[]) {
  return useMemo(() => {
    return entries.filter((entry) => likedIds.includes(entry.id));
  }, [entries, likedIds]);
}

export default function FavoritesScreen() {
  const router = useRouter();
  // Mengambil data dari Context
  const { entries, likedIds, toggleLike } = useDiary();

  // Menggunakan custom hook untuk mendapatkan data yang difilter
  const likedEntries = useLikedEntries(entries, likedIds);

  return (
    <View style={styles.container}>
      {/* Poin 4: Menampilkan hanya diary yang disukai */}
      {likedEntries.length === 0 ? (
        <Text style={styles.emptyText}>Belum ada diary favorit.</Text>
      ) : (
        <FlatList
          data={likedEntries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/detail/${item.id}`)}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress={() => toggleLike(item.id)}>
                  <Text style={{ fontSize: 20 }}>❤️</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.mood}>{item.mood}</Text>
              <Text style={styles.content} numberOfLines={2}>
                {item.content}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  emptyText: { textAlign: "center", marginTop: 40, color: "#888" },
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
