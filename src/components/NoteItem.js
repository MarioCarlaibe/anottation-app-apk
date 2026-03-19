import { View, Text, TouchableOpacity } from 'react-native'

export default function NoteItem({ note, onToggle, onDelete }) {
  return (
    <View className="border rounded-lg p-3 mt-3 bg-white">
      <TouchableOpacity onPress={() => onToggle(note.id)}>
        <Text
          className={`text-base ${
            note.done ? 'line-through text-gray-400' : ''
          }`}
        >
          {note.done ? '✅ ' : '⬜ '} {note.text}
        </Text>
      </TouchableOpacity>

      <Text className="text-gray-500 mt-1">
        {note.category}
      </Text>

      <TouchableOpacity onPress={() => onDelete(note.id)}>
        <Text className="text-red-500 mt-2">
          Excluir
        </Text>
      </TouchableOpacity>
    </View>
  )
}