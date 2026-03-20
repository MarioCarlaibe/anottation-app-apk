import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import NoteItem from "../components/NoteItem";
import { getNotes, saveNotes } from "../storage/notesStorage";

export default function Home() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("geral");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    const data = await getNotes();
    setNotes(data);
  }

  async function addNote() {
    const cleanedText = text.trim();

    if (!cleanedText) return;

    const newNote = {
      id: Date.now(),
      text: cleanedText,
      category,
      done: false,
    };

    const updated = [...notes, newNote];
    setNotes(updated);
    setText("");
    await saveNotes(updated);
  }

  async function toggleDone(id) {
    const isAlreadySelected = notes.find((n) => n.id === id)?.done;

    const updated = notes.map((n) => {
      if (n.id === id) {
        return { ...n, done: !isAlreadySelected };
      }

      return { ...n, done: false };
    });

    setNotes(updated);
    await saveNotes(updated);
  }

  async function deleteSelectedNote() {
    const hasSelectedNote = notes.some((n) => n.done);

    if (!hasSelectedNote) {
      Alert.alert("Atenção", "Selecione uma nota para excluir!");
      return;
    }

    const updated = notes.filter((n) => !n.done);
    setNotes(updated);
    await saveNotes(updated);
  }

  return (
    <View
      className="flex-1 bg-gray-600"
      style={{ paddingVertical: 60, paddingHorizontal: 10 }}
    >
      <Text className="mb-4 text-2xl font-bold text-gray-50">
        Minhas Anotações
      </Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Digite sua nota..."
        placeholderTextColor="#9CA3AF"
        className="mb-3 rounded-lg border border-gray-500 bg-gray-700 p-3 text-gray-50"
      />

      <TouchableOpacity
        onPress={addNote}
        className="mb-3 items-center justify-center bg-cyan-500 p-3"
        style={{ borderRadius: 8 }}
      >
        <Text className="font-bold text-white">Salvar</Text>
      </TouchableOpacity>

      <View className="mb-3 rounded-lg border border-gray-500 bg-gray-700">
        <Picker
          selectedValue={category}
          onValueChange={setCategory}
          style={{ color: "#F9FAFB" }}
          dropdownIconColor="#F9FAFB"
        >
          <Picker.Item label="Geral" value="geral" />
          <Picker.Item label="Trabalho" value="trabalho" />
          <Picker.Item label="Estudo" value="estudo" />
        </Picker>
      </View>

      <FlatList
        className="mt-3 flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        ListEmptyComponent={
          <Text className="mt-6 text-center text-gray-200">
            Sem anotações ainda.
          </Text>
        }
        renderItem={({ item }) => (
          <NoteItem note={item} onToggle={toggleDone} />
        )}
      />

      <TouchableOpacity
        onPress={deleteSelectedNote}
        className="items-center justify-center bg-red-500 p-3"
        style={{ borderRadius: 8 }}
      >
        <Text className="font-bold text-white">Excluir Selecionada</Text>
      </TouchableOpacity>
    </View>
  );
}
