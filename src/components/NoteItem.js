import { View, Text, TouchableOpacity } from 'react-native'

export default function NoteItem({ note, onToggle, onDelete }) {
  return (
    <View
      style={{
        borderWidth: 1,
        padding: 12,
        marginTop: 10,
        borderRadius: 8
      }}
    >
      <TouchableOpacity onPress={() => onToggle(note.id)}>
        <Text
          style={{
            fontSize: 16,
            textDecorationLine: note.done ? 'line-through' : 'none'
          }}
        >
          {note.done ? '✅ ' : '⬜ '} {note.text}
        </Text>
      </TouchableOpacity>

      <Text style={{ color: 'gray', marginTop: 5 }}>
        {note.category}
      </Text>

      <TouchableOpacity onPress={() => onDelete(note.id)}>
        <Text style={{ color: 'red', marginTop: 5 }}>
          Excluir
        </Text>
      </TouchableOpacity>
    </View>
  )
}