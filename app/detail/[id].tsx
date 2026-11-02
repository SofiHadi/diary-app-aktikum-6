import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { useDiary } from "../../src/context/DiaryContext";

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const { entries, likedIds, toggleLike } = useDiary();

  // Mencari data diary spesifik berdasarkan ID
  const entry = entries.find((e) => e.id === id);
  const isLiked = likedIds.includes(id as string);

  if (!entry) {
    return (
      <View style={styles.centerContainer}>
        <Text>Diary tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: entry.title }} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{entry.title}</Text>
          <Text style={styles.mood}>{entry.mood}</Text>
        </View>

        <Text style={styles.content}>{entry.content}</Text>

        <TouchableOpacity
          onPress={() => toggleLike(entry.id)}
          style={styles.likeButton}
        >
          <Text style={styles.likeText}>
            {isLiked ? "❤️ Disukai" : "🤍 Suka"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 6 },
  mood: { fontSize: 14, color: "#666" },
  content: { fontSize: 16, lineHeight: 24, color: "#444", marginBottom: 40 },
  likeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  likeText: { fontSize: 16, fontWeight: "600", color: "#333" },
});
