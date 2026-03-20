import { Text, TouchableOpacity, View } from "react-native";

export default function NoteItem({ note, onToggle }) {
  return (
    <View className="rounded-lg border border-gray-500 bg-gray-700 p-3">
      <TouchableOpacity onPress={() => onToggle(note.id)}>
        <Text
          className={`text-base text-gray-50 ${
            note.done ? "line-through text-gray-300" : ""
          }`}
        >
          {note.done ? "✅ " : "⬜ "} {note.text}
        </Text>
      </TouchableOpacity>

      <Text className="mt-1 text-gray-200">{note.category}</Text>
    </View>
  );
}
