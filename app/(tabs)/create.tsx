import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

// Import context tetap dipertahankan
import { useDiary } from "../../src/context/DiaryContext";

// KITA MASUKKAN LANGSUNG DESAIN TOKEN DI SINI AGAR TIDAK ERROR IMPORT
const COLORS = {
  primary: "#007AFF",
  accent: "#FF3B30",
  background: "#FFFFFF",
  text: "#333333",
  textSecondary: "#666666",
  border: "#CCCCCC",
  card: "#F9F9F9",
  chip: "#F0F0F0",
};

const SPACE = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

const RADIUS = {
  small: 4,
  medium: 8,
  large: 16,
  round: 50,
};

const MOODS = ["😊 Senang", "😢 Sedih", "😐 Netral", "🔥 Bersemangat"];

export default function CreateScreen() {
  const router = useRouter();
  const { addEntry } = useDiary();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedMood, setSelectedMood] = useState("");

  const handleSave = () => {
    if (!title || !content || !selectedMood) {
      Alert.alert("Error", "Harap isi judul, cerita, dan pilih mood!");
      return;
    }

    addEntry({
      id: Date.now().toString(),
      title,
      content,
      mood: selectedMood,
      date: new Date().toISOString().split("T")[0],
    });

    // Reset form setelah simpan
    setTitle("");
    setContent("");
    setSelectedMood("");

    // Kembali ke halaman utama (Home)
    router.replace("/");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Judul Diary</Text>
      <TextInput
        style={styles.input}
        placeholder="Masukkan judul diary..."
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Pilih Mood Hari Ini</Text>
      <View style={styles.moodContainer}>
        {MOODS.map((mood) => (
          <TouchableOpacity
            key={mood}
            style={[
              styles.moodChip,
              selectedMood === mood ? styles.moodSelected : null,
            ]}
            onPress={() => setSelectedMood(mood)}
          >
            <Text
              style={[
                styles.moodText,
                selectedMood === mood ? styles.moodTextSelected : null,
              ]}
            >
              {mood}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Isi Cerita</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Tulis ceritamu di sini..."
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Simpan Diary</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: SPACE.medium,
    backgroundColor: COLORS.background,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACE.small,
    marginTop: SPACE.medium,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.medium,
    padding: SPACE.medium,
    fontSize: 16,
    backgroundColor: COLORS.card,
  },
  textArea: {
    height: 150,
  },
  moodContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACE.small,
  },
  moodChip: {
    paddingVertical: SPACE.small,
    paddingHorizontal: SPACE.medium,
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.chip,
    borderWidth: 2,
    borderColor: "transparent",
  },
  moodSelected: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.primary,
  },
  moodText: {
    color: COLORS.text,
    fontSize: 14,
  },
  moodTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: SPACE.medium,
    borderRadius: RADIUS.medium,
    alignItems: "center",
    marginTop: SPACE.large,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
